import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { LIVE_USERS } from '../graphql/subscriptions/user'
import { LIVE_AUCTION } from '../graphql/subscriptions/auction'
import UsersLobbyActions from '../components/UsersLobbyActions'

const UsersLobby = () => {
    const params = useParams()
    const history = useHistory()

    const { 
        data: auctionData, 
        error: auctionError, 
        loading: auctionLoading 
    } = useSubscription(LIVE_AUCTION, { variables: { auctionName: params.auctionName } })

    const { 
        data: users, 
        loading: usersLoading, 
        error: usersError 
    } = useSubscription(LIVE_USERS, { variables: { auctionName: params.auctionName }  });

    useEffect(() => {
        if(auctionData && auctionData.auction.status === 'started') {
            history.push(`/auction/${auctionData.auction.name}`)
        }
    }, [auctionData])

    if(usersLoading || auctionLoading) return <p>Loading...</p>

    if(usersError || auctionError) {
        console.log(usersError)
        return <p>Error..</p>
    }

    const { auctionUsers } = users

    return (
        <div className="container mx-auto">
            <header className="mb-5">
                <p>Codice Invito: {params.auctionName}</p>
            </header>
            <section className="flex flex-col justify-center mb-20">
                {auctionUsers.map(user => (
                    <div key={user._id} className={`px-10 py-3 shadow-md my-3 rounded flex justify-between items-center ${user.ready ? 'bg-green-300' : 'bg-red-300'}`}>
                        <p className="flex-1 uppercase text-bold mr-5">{user.nickName}</p>
                        <div>{user.ready ? 'pronto' : 'non pronto'}</div>
                    </div>
                ))}
            </section>

            <UsersLobbyActions auctionUsers={auctionUsers} auctionData={auctionData}/>
        </div>
    )
}

export default UsersLobby
