import React from 'react'
import Timer from 'react-compound-timer'
import { CLOSE_BID_OFFER } from '../../graphql/mutations/auction'
import { useMutation } from '@apollo/client'
import jwt_decode from "jwt-decode";

const _Timer = ({ auctionData, highestBid }) => {

    const [closeBid] = useMutation(CLOSE_BID_OFFER)

    const { userId } = jwt_decode(localStorage.getItem('authToken'));
    const player = auctionData.auction.bidPlayer

    const closeOffer = () => {
        const auctionId = auctionData.auction._id
        const playerId = player._id
        if(highestBid.from._id === userId){
            closeBid({ variables: { auctionId, playerId } })
        }
    }

    return (
    <Timer
        initialTime={10000}
        direction="backward"
        checkpoints={[
            {
                time: 0,
                callback: () => closeOffer(),
            }
        ]}
    >
        {() => (
            <div className="w-full px-5 py-2 rounded-md bg-white text-darkBlue text-center text-xs">
                <p>Asta per <span className="font-bold">{player.name}</span> chiude tra: </p>
                <div className="font-bold text-lg text-gold">
                    <Timer.Seconds />s
                </div>
                <p>Fai un offerta per rimanere in questa trattativa.</p>
            </div>
        )}
    </Timer>
    )
}

export default _Timer
