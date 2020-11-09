import React, { useEffect } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { LIVE_AUCTION } from '../graphql/subscriptions/auction'
import UsersLobbyActions from '../components/UsersLobbyActions'
import { FiCheck as Ready, FiX as NotReady } from "react-icons/fi";


const UsersLobby = () => {
    const params = useParams()
    const history = useHistory()

    const authToken = window.localStorage.getItem('authToken')

    const { 
        data: auctionData, 
        error: auctionError, 
        loading: auctionLoading 
    } = useSubscription(LIVE_AUCTION, { variables: { auctionName: params.auctionName } })

    useEffect(() => {
        if(auctionData && auctionData.auction.status === 'started') {
            history.push(`/auction/${auctionData.auction.name}`)
        }
    }, [auctionData, history])

    if(auctionLoading) return <p>Loading...</p>

    if(auctionError) {
        console.log(auctionError)
        return <p>Error..</p>
    }

    const users = auctionData && auctionData.auction.users

    return (
        <>
        {!authToken ? <Redirect to={`/auth/login?prev=/users/${params.auctionName}`}/> : (
            <div className="container mx-auto md:p-0 px-5" style={{ maxWidth: 400 }}>
                <h1 className="mb-3 p-5 text-center uppercase text-darkGrey text-sm font-bold mt-8">Lobby</h1>
                <header className="my-6">
                    <p className="text-lightGrey uppercase font-semibold text-xs ">Codice Invito: 
                        <span className="font-bold lowercase inline-block text-green-500 text-sm ml-5">{params.auctionName}</span>
                        </p>
                </header>
                <section className="flex flex-col justify-center items-center mb-20">
                    {users.map(user => (
                        <div 
                            key={user._id} 
                            className="px-10 py-5 shadow-lg my-3 rounded flex justify-between items-center w-full"
                        >
                            <p className="text-darkGrey flex-1 uppercase font-bold mr-5 text-xs">{user.nickName}</p>
                            {user.ready ? <Ready color="green" size="1.5rem"/> : <NotReady color="red" size="1.5rem"/> }
                        </div>
                    ))}
                </section>

                <UsersLobbyActions auctionData={auctionData}/>
            </div>
        )}
        </>
    )
}

export default UsersLobby
