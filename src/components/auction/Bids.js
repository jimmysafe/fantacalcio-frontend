import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import { useTransition, animated } from "react-spring";
import Bid from './Bid';

const Bids = ({ auctionData, highestBid }) => {
    const bids = auctionData.auction.bids
    const [showTimer, setShowTimer] = useState(false)

    const transitions = useTransition(bids, (_, i) => i, {
        from: {
        //   transform: `translateY(150px)`,
          bottom: 0,
          opacity: 1,
          position: 'absolute',
          width: "80%",
          left: "10%",
        },
        enter: {
        //   transform: `translateY(0px)`,
          bottom: 60,
          opacity: 0,
        },
        leave: {
          opacity: 0
        },
        config: {
          duration: 500
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
    
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex justify-center items-center p-3 flex-col">
                <Bid bid={bids[bids.length-1].bid} from={bids[bids.length-1].from.nickName} opacity={100}/>
                {bids.length >= 2 &&
                    <Bid bid={bids[bids.length-2].bid} from={bids[bids.length-2].from.nickName} opacity={50}/>
                }
                {bids.length >= 3 && window.innerHeight > 667 &&
                    <Bid bid={bids[bids.length-3].bid} from={bids[bids.length-3].from.nickName} opacity={25}/>
                }
            </div>
            <div className="flex-1 p-5 flex justify-center items-end relative bg-white flex-col w-full">
                { showTimer && <Timer auctionData={auctionData} highestBid={highestBid}/> }
                {transitions.map(({ item, props, key }) => {
                    return (
                        <animated.div 
                            key={key}
                            style={props}
                            className="bg-gold text-darkGrey flex justify-between items-center font-semibold text-sm rounded px-5 py-2 mb-1" 
                        >
                            <p>{item.from.nickName}</p>
                            <p>{item.bid}</p>
                        </animated.div>
                    )
                })}
            </div>
        </div>

    )
}

export default Bids
