import React from 'react'
import { GET_DEFENDERS } from '../../../graphql/queries/players'
import { useQuery } from '@apollo/client'

const Defenders = ({ auctionData, setLocked, auctionPlayer }) => {
    const { data, loading } = useQuery(GET_DEFENDERS)

    if(loading) return <p>Loading..</p>

    const already_chosen_players = auctionData.auction.chosenPlayers
    
    return (
        <div className="p-5">
            {data.defenders.map(player => {
                if(!already_chosen_players.includes(player._id)){
                return (
                    <div 
                        key={player._id} 
                        onClick={() => {
                            setLocked(true)
                            auctionPlayer({ variables: { playerId: player._id, auctionId: auctionData.auction._id } })
                        }}
                        className="my-1 text-center py-3 border border-b-black uppercase font-semibold text-gray-900 cursor-pointer text-xs" 
                    >
                        {player.name}
                    </div>
                )} else return null
            })}
        </div>
    )
}

export default Defenders
