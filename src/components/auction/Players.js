import React, { useState, useEffect, useRef } from 'react'
import { PLAYERS_ALLOCATION } from '../../graphql/queries/players'
import { UPDATE_AUCTION_PLAYER } from '../../graphql/mutations/auction'
import { useQuery, useMutation } from '@apollo/client'
import GoalKeepers from './players/GoalKeepers'
import Defenders from './players/Defenders'
import Midfielders from './players/Midfielders'
import Strikers from './players/Strikers'

const Players = ({ auctionData, myTurn }) => {
    const { data: playerAllocation, loading } = useQuery(PLAYERS_ALLOCATION, { variables: { auctionId: auctionData.auction._id } })
    const [auctionPlayer] = useMutation(UPDATE_AUCTION_PLAYER)
    const [locked, setLocked] = useState(false)
    const playersContainerRef = useRef()

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

    useEffect(() => {
        if(playersContainerRef && playersContainerRef.current){
            playersContainerRef.current.scrollTop = 0
        }
    }, [myTurn, locked])

    const renderPlayers = (allocation) => {

        const props = {
            auctionData,
            myTurn,
            locked,
            setLocked,
            auctionPlayer
        }

        if (!allocation.P && !allocation.D && !allocation.C && !allocation.A){
            return <GoalKeepers { ...props }/>
        } else if (allocation.P && !allocation.D && !allocation.C && !allocation.A) {
            return <Defenders { ...props } />
        } else if (allocation.P && allocation.D && !allocation.C && !allocation.A) {
            return <Midfielders { ...props }/>
        } else if (allocation.P && allocation.D && allocation.C && !allocation.A) {
            return <Strikers { ...props }/>
        } else {
            return <p>Asta Completata!</p>
        }
    }
    
    if(loading) return <p>Loading..</p>

    const allocation = playerAllocation.auctionUserPlayersAllocation

    return (
        <div ref={playersContainerRef} className={`p-5 relative flex-1 ${auctionData.auction.bidPlayer || !myTurn ? 'overflow-hidden' : 'overflow-scroll'}`}>
            {renderPlayers(allocation)}
        </div>
    )
}

export default Players
