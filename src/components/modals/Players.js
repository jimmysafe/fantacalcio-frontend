import React, { useState, useEffect } from 'react'
import { UPDATE_AUCTION_PLAYER } from '../../graphql/mutations/auction'
import { useMutation } from '@apollo/client'
import GoalKeepers from '../auction/players/GoalKeepers'
import Defenders from '../auction/players/Defenders'
import Midfielders from '../auction/players/Midfielders'
import Strikers from '../auction/players/Strikers'

const Players = ({ auctionData, myTurn }) => {
    const [auctionPlayer] = useMutation(UPDATE_AUCTION_PLAYER)

    const [locked, setLocked] = useState(false)
    const [tab, setTab] = useState('Portieri')

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
    
    return (
        <>
        { myTurn &&
            !locked ?   
                <section className="fixed top-0 left-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center z-20">
                    <div  className="flex-1 bg-white rounded-md flex flex-col mx-4 rounded-sm overflow-hidden md:w-2/4 max-w-screen-sm" style={{ height: 520 }}>
                        <div className="flex text-xs justify-between items-center bg-white text-darkBlue text-center border-b border-lightBlue">
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Portieri" ? 'bg-lightBlue text-white' : ''}`} onClick={() => setTab('Portieri')}>Portieri</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Difensori" ? 'bg-lightBlue text-white' : ''}`} onClick={() => setTab('Difensori')}>Difensori</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Centrocampo" ? 'bg-lightBlue text-white' : ''}`} onClick={() => setTab('Centrocampo')}>Centrocampo</div>
                            <div className={`p-3 flex-1 cursor-pointer ${tab === "Attaccanti" ? 'bg-lightBlue text-white' : ''}`} onClick={() => setTab('Attaccanti')}>Attaccanti</div>
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
