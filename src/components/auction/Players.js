import React, { useState, useEffect, useRef } from 'react'
// import { PLAYERS_ALLOCATION } from '../../graphql/queries/players'
import { UPDATE_AUCTION_PLAYER } from '../../graphql/mutations/auction'
import { useQuery, useMutation } from '@apollo/client'
import GoalKeepers from './players/GoalKeepers'
import Defenders from './players/Defenders'
import Midfielders from './players/Midfielders'
import Strikers from './players/Strikers'

const Players = ({ auctionData, myTurn }) => {
    // const { data: playerAllocation, loading } = useQuery(PLAYERS_ALLOCATION, { variables: { auctionId: auctionData.auction._id } })
    const [auctionPlayer] = useMutation(UPDATE_AUCTION_PLAYER)

    const [locked, setLocked] = useState(false)
    const [tab, setTab] = useState('Portieri')

    // const playersContainerRef = useRef()

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

    // useEffect(() => {
    //     if(playersContainerRef && playersContainerRef.current){
    //         playersContainerRef.current.scrollTop = 0
    //     }
    // }, [myTurn, locked])

    const renderPlayers = () => {

        const props = {
            auctionData,
            myTurn,
            locked,
            setLocked,
            auctionPlayer
        }

        switch(tab){
            case 'Portieri':
                return <GoalKeepers { ...props }/>;
            case 'Difensori':
                return <Defenders { ...props }/>
            case 'Centrocampo':
                return <Midfielders { ...props }/>
            case 'Attaccanti':
                return <Strikers { ...props }/>
            default:
                return <p>Tab Error</p>
        }
    }
    
    // if(loading) return <p>Loading..</p>

    // const allocation = playerAllocation.auctionUserPlayersAllocation

    return (
        <>
        { myTurn &&
            !locked ?   
                <section className="fixed top-0 left-0 bg-black bg-opacity-25 w-screen h-screen flex justify-center items-center">
                    <div  className="p-5 flex-1 bg-white rounded-md flex flex-col" style={{ maxWidth: 430, height: 520 }}>
                        <div className="flex text-xs justify-between items-center bg-gray-900 text-white text-center">
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Portieri" ? 'bg-teal-400' : ''}`} onClick={() => setTab('Portieri')}>Portieri</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Difensori" ? 'bg-teal-400' : ''}`} onClick={() => setTab('Difensori')}>Difensori</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Centrocampo" ? 'bg-teal-400' : ''}`} onClick={() => setTab('Centrocampo')}>Centrocampo</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Attaccanti" ? 'bg-teal-400' : ''}`} onClick={() => setTab('Attaccanti')}>Attaccanti</div>
                        </div>
                        <div className="playersModal flex-1 overflow-scroll">
                            {renderPlayers()}
                        </div>
                    </div>
                </section>
            : <></>
        }
        </>
    )
}

export default Players
