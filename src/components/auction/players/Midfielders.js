import React from 'react'
import { GET_MIDFIELDERS } from '../../../graphql/queries/players'
import { useQuery } from '@apollo/client'

const Midfielders = ({ auctionData, setLocked, auctionPlayer }) => {
    const { data, loading } = useQuery(GET_MIDFIELDERS)

    if(loading) return <p>Loading..</p>

    const already_chosen_players = auctionData.auction.chosenPlayers
    
    return (
        <>
            <h3 className="text-center uppercase text-xs py-2 font-bold text-white bg-teal-400 mb-5">Centrocampisti</h3>
            {data.midfielders.map(player => {
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
                }
            )}
        </>
    )
}

export default Midfielders
