import React, { useEffect, useState } from 'react'
import Timer from './Timer'
import { useTransition, animated } from "react-spring";

const randomPx = () => {
    let randomN = Math.floor(Math.random() * 100);
    if (randomN % 2 === 0) {
      return randomN;
    } else {
      return -randomN;
    }
};

const Bids = ({ auctionData, highestBid }) => {
    const bids = auctionData.auction.bids
    const [showTimer, setShowTimer] = useState(false)

    const transitions = useTransition(bids, (_, i) => i, {
        from: {
          transform: `translate(0px, 0px)`,
          opacity: 1,
          height: "auto",
          width: "auto",
          position: 'relative'
        },
        enter: {
          transform: `translate(${randomPx()}px, -200px)`,
          opacity: 0,
          height: 0,
          width: 0,
          position: "absolute"
        },
        leave: {
          transform: `translate(${randomPx()}px, 0px)`,
          opacity: 0,
          height: 0,
          width: 0,
          position: "absolute"  
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
    
    // const orderedBids = transitions.sort((a, b) => b.bid-a.bid).slice(0, 5);

    return (
        <div className="flex p-5 flex-col h-full">
            <div className="flex justify-center items-center p-3">
                <div 
                    className="bg-teal-400 text-white font-bold flex flex-col justify-center items-center" 
                    style={{ width: 400, height: 200 }}
                >
                    <span className="text-sm uppercase">{highestBid.from.nickName}</span>
                    <span style={{ fontSize: '2.5rem' }}>
                        {highestBid.bid}
                    </span>
                </div>
            </div>
            <div className="flex-1 flex justify-center items-end relative">
                {transitions.map(({ item, props, key }) => {
                    return (
                        <animated.div style={props} key={key}>
                            <div 
                                className="bg-red-500 text-white flex justify-center items-center font-bold text-xl rounded-full" 
                                style={{ width: 50, height: 50 }}
                            >
                                {item.bid}
                            </div>
                        </animated.div>
                    )
                })}
            </div>
            { showTimer && <Timer auctionData={auctionData} highestBid={highestBid}/> }
        </div>
    )
}

export default Bids
