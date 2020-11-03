import React from 'react'
import jwt_decode from "jwt-decode";
import { ADD_BID } from '../../graphql/mutations/auction'
import { useMutation } from '@apollo/client'

const BidActions = ({ auctionData, highestBid }) => {

    const { userId } = jwt_decode(localStorage.getItem('authToken'))
    const auctionId = auctionData.auction._id
    const biddingIsOpen = auctionData.auction.bidPlayer
    const bid = highestBid ? highestBid.bid : 0

    return (
        <div className="flex justify-between relative p-5">
            {!biddingIsOpen &&
                <div className="absolute h-full w-full top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center">
                    <p className="text-white font-bold uppercase">Locked</p>
                </div>
            }
            <BidButton amount={bid + 1} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid + 5} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid + 10} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid + 20} userId={userId} auctionId={auctionId}/>
            <BidButton amount={bid + 30} userId={userId} auctionId={auctionId}/>
        </div>
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
            className="bg-gray-900 text-red-500 rounded-md text-center cursor-pointer font-bold text-lg flex justify-center items-center"
            style={{ minWidth: 70, height: 70 }}
        >
            {amount}
        </div>
    )
}

export default BidActions
