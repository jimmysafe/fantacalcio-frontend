import React from 'react'

const AuctionHeader = ({ user, highestBid }) => {

    const userCredits = user ? user.credits : 0

    return (
        <div className="p-5 flex justify-between items-center uppercase font-semibold text-xs text-lightGrey tracking-wide">
            <div>
                Crediti
                <span className="text-darkBlue bg-gold px-3 py-1 rounded inline-block ml-2">{userCredits}</span>
            </div>
            {highestBid &&
            <div>
                    Miglior Offerta
                    <span className="text-white bg-lightBlue px-3 py-1 rounded inline-block ml-2">{highestBid.bid}</span>
            </div>
            }
        </div>
    )
}

export default AuctionHeader
