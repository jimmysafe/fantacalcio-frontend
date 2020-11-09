import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import { useTransition, animated } from "react-spring";
import Bid from './Bid';

const Bids = ({ auctionData, highestBid }) => {
    const bids = auctionData.auction.bids
    const [showTimer, setShowTimer] = useState(false)

    const transitions = useTransition(bids, (_, i) => i, {
        from: {
          transform: `translateY(150px)`,
          opacity: 1,
          position: 'relative'
        },
        enter: {
          transform: `translateY(0px)`,
          opacity: 0,
          position: 'absolute',
        },
        leave: {
          transform: `translateY(0px)`,
          opacity: 0
        },
        config: {
          duration: 700
        }
      });

    const activeTimer = auctionData.auction.timer

    // ------- BIDDING TIMER ------

    useEffect(() => {
        let timer
        let sec = 0
        if(auctionData && activeTimer){
            timer = setInterval(() => {
                sec++
                if(sec >= 9){
                    setShowTimer(true)
                    clearInterval(timer)
                }
            }, 1000)
        }
        return () => {
            setShowTimer(false)
            clearInterval(timer)
        }
    }, [auctionData, activeTimer])
    
    // const orderedBids = transitions.sort((a, b) => b.bid-a.bid).slice(0, 5);
    return (
        <div className="flex p-5 flex-col h-full">
            <div className="flex justify-center items-center p-3 flex-col">
                <Bid bid={bids[bids.length-1].bid} from={bids[bids.length-1].from.nickName} opacity={100}/>
                <Bid bid={bids[bids.length-1].bid} from={bids[bids.length-1].from.nickName} opacity={50}/>
                <Bid bid={bids[bids.length-1].bid} from={bids[bids.length-1].from.nickName} opacity={25}/>
            </div>
            <div className="flex-1 flex justify-center items-end relative bg-white flex-col">
                {transitions.map(({ item, props, key }) => {
                    return (
                        
                        <animated.div 
                            key={key}
                            style={props}
                            className="bg-gold text-darkGrey flex justify-between items-center font-semibold text-sm rounded w-full px-5 py-2 mb-1" 
                        >
                            <p>{item.from.nickName}</p>
                            <p>{item.bid}</p>
                        </animated.div>
                    )
                })}
            </div>
            { showTimer && <Timer auctionData={auctionData} highestBid={highestBid}/> }
        </div>
    )
}

export default Bids
