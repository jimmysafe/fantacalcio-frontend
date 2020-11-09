import React from 'react'

const AuctionNotification = ({ auctionData }) => {
    const { bidPlayer } = auctionData.auction 

    const getRole = () => {
        switch(bidPlayer.role){
            case 'P':
                return 'Portiere'
            case 'D':
                return 'Difensore'
            case 'C':
                return 'Centrocampista'
            case 'A':
                return 'Attaccante'
            default:
                return 'Giocatore'
        }
    }

    return (
        <div className="p-3 rounded-md bg-white text-center uppercase text-sm font-semibold">
            {bidPlayer ?
            <div>
                <h3 className="font-bold">{bidPlayer.name}</h3>
                <div className="flex justify-around items-center mt-3">
                <p className="text-xs text-lightGrey uppercase">{getRole()}</p>
                <p className="text-xs text-lightGrey uppercase">{bidPlayer.team}</p>
                </div>
            </div>
            :
                <h3>{auctionData.auction.turnOf.nickName} sta scegliendo un giocatore..</h3>
            }
        </div>
    )
}

export default AuctionNotification
