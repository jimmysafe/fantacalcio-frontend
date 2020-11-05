import React, { useEffect } from 'react'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { LIVE_AUCTION } from '../graphql/subscriptions/auction'
import UsersLobbyActions from '../components/UsersLobbyActions'

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
            <div className="container mx-auto">
                <h1 className="mb-3 p-5 text-center uppercase text-gray-800 font-bold">Lobby</h1>
                <header className="mb-3 p-5 text-center uppercase text-gray-800">
                    <p>Codice Invito: <span className="font-bold lowercase">{params.auctionName}</span></p>
                </header>
                <section className="flex flex-col justify-center items-center mb-20">
                    {users.map(user => (
                        <div 
                            key={user._id} 
                            style={{ width: 400 }}
                            className={`px-10 py-3 shadow-md my-3 rounded flex justify-between items-center ${user.ready ? 'bg-teal-400' : 'bg-red-500'}`}
                        >
                            <p className="text-white flex-1 uppercase font-bold mr-5 text-xs">{user.nickName}</p>
                            <div className="font-bold uppercase text-white text-xs">{user.ready ? 'pronto' : 'non pronto'}</div>
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
