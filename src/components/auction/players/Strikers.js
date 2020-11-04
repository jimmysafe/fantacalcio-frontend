import React from 'react'
import { GET_STRIKERS, PLAYERS_ALLOCATION } from '../../../graphql/queries/players'
import { useQuery } from '@apollo/client'

const Strikers = ({ auctionData, myTurn, locked, setLocked, auctionPlayer }) => {
    const { data, loading } = useQuery(GET_STRIKERS)

    if(loading) return <p>Loading..</p>
    
    return (
        <>
            {(!myTurn || locked ) &&
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center rounded-b-md">
                    <p className="uppercase text-md text-white font-bold">Locked</p>
                </div>
            }
            <h3 className="text-center uppercase text-xs py-2 font-bold text-white bg-teal-400 mb-5">Attaccanti</h3>
            {data.strikers.map(player => {
                return (
                    <div 
                        key={player._id} 
                        onClick={() => {
                            setLocked(true)
                            auctionPlayer({ 
                                variables: { playerId: player._id, auctionId: auctionData.auction._id },
                                refetchQueries: [{ query: PLAYERS_ALLOCATION, variables: { auctionId: auctionData.auction._id } }] 
                            })
                        }}
                        className="my-1 text-center py-3 border border-b-black uppercase font-semibold text-gray-900 cursor-pointer text-xs" 
                    >
                        {player.name}
                    </div>
                )}
            )}
        </>
    )
}

export default Strikers
