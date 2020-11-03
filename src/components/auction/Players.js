import React, { useState, useEffect } from 'react'
import { GET_PLAYERS } from '../../graphql/queries/players'
import { UPDATE_AUCTION_PLAYER } from '../../graphql/mutations/auction'
import { useQuery, useMutation } from '@apollo/client'

const Players = ({ auctionData, myTurn }) => {
    const { data, loading, error } = useQuery(GET_PLAYERS)
    const [auctionPlayer] = useMutation(UPDATE_AUCTION_PLAYER)
    const [locked, setLocked] = useState(false)

    useEffect(() => {
        if(auctionData.auction.bidPlayer){
            setLocked(true)
        }
    }, [auctionData])

    useEffect(() => {
        if(myTurn && locked){
            setLocked(false)
        }
    }, [myTurn])

    if(loading) return <p>Loading..</p>


    return (
        <div>
            {(!myTurn || locked ) &&
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center rounded-b-md">
                    <p className="uppercase text-md text-white font-bold">Locked</p>
                </div>
            }
            {data.players.map(player => (
                <div 
                    key={player._id} 
                    onClick={() => {
                        setLocked(true)
                        auctionPlayer({ variables: { playerId: player._id, auctionId: auctionData.auction._id } })
                    }}
                    className="my-1 text-center py-3 border border-b-black uppercase font-semibold text-gray-900 cursor-pointer" 
                >
                    {player.name}
                </div>
            ))}
        </div>
    )
}

export default Players
