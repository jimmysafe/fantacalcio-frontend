import React, { useState } from 'react'
import jwt_decode from "jwt-decode";
import { ADD_BID } from '../../graphql/mutations/auction'
import { useMutation } from '@apollo/client'
import Slider from "react-input-slider";

const sliderStyles = {
    track: {
        backgroundColor: 'white',
        height: 10,
        width: '100%'
    },
    active: {
        backgroundColor: 'white'
    },
    thumb: {
        backgroundColor: 'white',
        width: 20,
        height: 20
    },
    disabled: {
        opacity: 0.5
    }
}

const BidActions = ({ auctionData, highestBid }) => {

    const [addBid] = useMutation(ADD_BID)
    
    const [sliderPos, setSliderPos] = useState(0)

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
                    {role ? `Hai raggiunto il limite massimo di ${role}.` : 'In Attesa'}
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
        <div className="bg-darkBlue">
            <div className="flex justify-between relative px-5 py-3">
                { canBid() }
                {!sliderPos ? (
                    <>
                        <BidButton amount={bid(1)} userId={userId} auctionId={auctionId}/>
                        <BidButton amount={bid(5)} userId={userId} auctionId={auctionId}/>
                        <BidButton amount={bid(10)} userId={userId} auctionId={auctionId}/>
                        <BidButton amount={bid(20)} userId={userId} auctionId={auctionId}/>
                    </>
                ) : (
                    <>
                        <button 
                            className="uppercase text-white font-semibold text-xs"
                            onClick={() => setSliderPos(0)}
                        >
                            Annulla
                        </button>

                        <BidButton amount={sliderPos} userId={userId} auctionId={auctionId} disabled/>
                        
                        <button 
                            className="uppercase text-white font-semibold text-xs"
                            onClick={() => {
                                addBid({ variables: {
                                    userId,
                                    auctionId,
                                    bidAmount: sliderPos
                                } })
                                setSliderPos(0)
                            }}
                        >
                            Conferma
                        </button>
                    </>
                )
                }
            </div>
            <div className="flex justify-between items-center px-8 py-5">
                <Slider
                    disabled={!user.credits || canBid()}
                    styles={sliderStyles}
                    axis="x"
                    x={sliderPos}
                    xmin={0}
                    xmax={user.credits}
                    onChange={ ({ x }) => setSliderPos(x) }
                />
            </div>
        </div>
    )
}


const BidButton = ({ amount, auctionId, userId, disabled=false }) => {
    const [addBid] = useMutation(ADD_BID)

    const addBidAction = () => {
        addBid({ variables: {
            userId,
            auctionId,
            bidAmount: amount
        } })
    }

    return (
        <button 
            disabled={disabled}
            onClick={() => addBidAction()}
            className="bg-gold rounded-sm py-2 px-3 text-sm font-semibold text-darkGrey flex justify-center items-center"
            style={{ minWidth: 70 }}
        >
            {amount}
        </button>
    )
}


export default BidActions
