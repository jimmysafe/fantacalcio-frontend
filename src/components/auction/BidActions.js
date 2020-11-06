import React, { useState } from 'react'
import jwt_decode from "jwt-decode";
import { ADD_BID } from '../../graphql/mutations/auction'
import { useMutation } from '@apollo/client'
import Slider from "react-input-slider";


const BidActions = ({ auctionData, highestBid }) => {

    const { userId } = jwt_decode(localStorage.getItem('authToken'))
    const auctionId = auctionData.auction._id
    const bidPlayer = auctionData.auction.bidPlayer
    const user = auctionData.auction.users.find(user => user._id === userId)
    const rules = auctionData.auction.rules

    const n_goalKeepers = user.players.filter(x => x.player.role === "P").length
    const n_defenders = user.players.filter(x => x.player.role === "D").length
    const n_midfielders = user.players.filter(x => x.player.role === "C").length
    const n_strikers = user.players.filter(x => x.player.role === "A").length

    const canBidGoalkeepers = n_goalKeepers < rules.goalkeepers
    const canBidDefenders = n_defenders < rules.defenders
    const canBidMidfielders = n_midfielders < rules.midfielders
    const canBidstrikers = n_strikers < rules.strikers


    const renderLock = (role) => {
        return (
            <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center">
                <p className="text-white font-bold uppercase">
                    {role ? `Hai raggiunto il limite massimo di ${role}.` : 'Locked'}
                </p>
            </div>
        )
    }

    const canBid = () => {
        if(!user.credits){
            return renderLock()
        } else if (bidPlayer && user.credits) {
            switch(bidPlayer.role){
                case 'P': 
                    return !canBidGoalkeepers ? renderLock('Portieri') : null
                case 'D':
                    return !canBidDefenders ? renderLock('Difensori') : null
                case 'C':
                    return !canBidMidfielders ? renderLock('Centrocampisti') : null
                case 'A':
                    return !canBidstrikers ? renderLock('Attaccanti') : null
                default:
                    return null
            }
        } else { 
            return renderLock()
        }
    }

    const bid = (n) => {
        if(highestBid){
            if(highestBid.bid + n > user.credits){
                return user.credits
            } else {
                return highestBid.bid + n
            }
        } else {
            return 0 + n
        }
    } 

    return (
        <>
        <div className="flex justify-center relative p-5">
            { canBid() }
            <BidButton amount={bid(1)} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid(5)} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid(10)} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid(20)} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid(30)} userId={userId} auctionId={auctionId}/>
        </div>
        <BidSlider userCredits={user.credits} userId={userId} auctionId={auctionId}/>
        </>
    )
}


const BidButton = ({ amount, auctionId, userId }) => {
    const [addBid] = useMutation(ADD_BID)

    const addBidAction = () => {
        addBid({ variables: {
            userId,
            auctionId,
            bidAmount: amount
        } })
    }

    return (
        <div 
            onClick={() => addBidAction()}
            className="bg-red-500 mx-2 text-white rounded-full text-center cursor-pointer font-bold text-lg flex justify-center items-center"
            style={{ minWidth: 50, height: 50 }}
        >
            {amount}
        </div>
    )
}

const BidSlider = ({ userCredits, auctionId, userId }) => {
    const [addBid] = useMutation(ADD_BID)
    
    const [sliderPos, setSliderPos] = useState(0)
    const [confirmButton, showConfirmButton] = useState(false)

    const addBidAction = () => {
        addBid({ variables: {
            userId,
            auctionId,
            bidAmount: sliderPos
        } })
        setSliderPos(0)
    }

    const sliderStyles = {
        track: {
            backgroundColor: '#f56565',
            height: 16,
            width: '100%'
        },
        active: {
            backgroundColor: '#f56565'
        },
        thumb: {
            backgroundColor: 'white',
            width: 25,
            height: 25
        },
        disabled: {
            opacity: 0.5
        }
    }

    return (
        <div className="flex justify-between items-center">
            <div className="px-3 w-full mt-2">
                <Slider
                    disabled={!userCredits}
                    styles={sliderStyles}
                    axis="x"
                    x={sliderPos}
                    xmin={0}
                    xmax={userCredits}
                    onChange={({ x }) => setSliderPos(x)}
                    onDragStart={() => showConfirmButton(false)}
                    onDragEnd={() => showConfirmButton(true)}
                />
            </div>

            <div 
                onClick={() => addBidAction()}
                className="bg-red-500 mx-2 text-white rounded-full text-center cursor-pointer font-bold text-lg flex justify-center items-center"
                style={{ minWidth: 50, height: 50 }}
            >
                {sliderPos}
            </div>
      </div>
    )
}

export default BidActions
