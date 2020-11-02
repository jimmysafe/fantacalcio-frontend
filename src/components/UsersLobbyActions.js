import React from 'react'
import { useMutation } from '@apollo/client'
import { USER_READY } from '../graphql/mutations/user'
import { UPDATE_AUCTION_STATUS, UPDATE_AUCTION_USER_TURN } from '../graphql/mutations/auction'
import { useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";
 

const UsersLobbyActions = ({ auctionUsers, auctionData }) => {

    const params = useParams()
    const { userId } = jwt_decode(localStorage.getItem('authToken'));

    const [updateUserTurn] = useMutation(UPDATE_AUCTION_USER_TURN)
    const [updateAuctionStatus] = useMutation(UPDATE_AUCTION_STATUS)
    const [userReady] = useMutation(USER_READY)
    
    const isOwner = auctionData.auction.owner._id === userId
    const user = auctionUsers.find(user => user._id === userId)
    const usersNotReady = auctionUsers.find(x => x.ready !== true)

    const startAuction = () => {
        updateUserTurn({ variables: { auctionId: auctionData.auction._id, userId: auctionData.auction.users[0]._id } })
        updateAuctionStatus({ variables: { auctionId: auctionData.auction._id, newStatus: 'started' } })
    }

    return (
        <section className="fixed bottom-0 left-0 bg-white shadow-inner w-full">
            <div className="container mx-auto flex justify-center items-center h-20">
                    <button
                        onClick={() => userReady({ variables: { userId, auctionName: params.auctionName } })}
                        className="px-5 py-2 rounded uppercase font-bold bg-teal-500 text-black"
                    >
                        { user.ready ? 'Non Pronto' : 'Pronto' }
                    </button>
                    {isOwner && 
                        <button
                            // disabled={usersNotReady}
                            onClick={() => startAuction()}
                            className="px-5 py-2 rounded uppercase font-bold bg-teal-500 text-black"
                        >
                            Start
                        </button>
                    }
            </div>
        </section>
    )
}

export default UsersLobbyActions
