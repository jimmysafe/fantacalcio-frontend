import React from 'react'
import { GET_PLAYERS } from '../../graphql/queries/players'
import { UPDATE_AUCTION_PLAYER } from '../../graphql/mutations/auction'
import { useQuery, useMutation } from '@apollo/client'

const Players = ({ auctionData, myTurn }) => {
    const { data, loading, error } = useQuery(GET_PLAYERS)
    const [auctionPlayer] = useMutation(UPDATE_AUCTION_PLAYER)

    if(loading) return <p>Loading..</p>

    return (
        <div>
            {data.players.map(player => (
                <div 
                    key={player._id} 
                    onClick={() => auctionPlayer({ variables: { playerId: player._id, auctionId: auctionData.auction._id } })}
                    className="my-1 text-center py-3 border border-b-black uppercase font-semibold text-gray-900 cursor-pointer" 
                >
                    {player.name}
                </div>
            ))}
        </div>
    )
}

export default Players
