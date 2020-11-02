import React from 'react'

const Bids = ({ auctionData }) => {
    const bids = auctionData.auction.bids
    
    const orderedBids = bids.sort((a, b) => b.bid-a.bid);

    const wrapperClassNames = i => {
        switch(i){
            case 0:
                return 'w-full';
            case 1:
                return 'w-10/12';
            case 2: 
                return 'w-8/12';
            case 3: 
                return 'w-6/12';
            case 4: 
                return 'w-4/12';
            default:
                return 'w-2/12';
        }
    }

    return (
        <>
            {orderedBids.map((bid, i) => (
                <div key={i} className="flex justify-end">
                    <div className={"my-2 py-2 bg-gray-900 text-white rounded-l-full" + " " + wrapperClassNames(i)}>
                        <span className="bg-red-500 text-white p-4 rounded-md shadow-md text-lg font-bold">{bid.bid}</span>
                        {" "}   
                        <span className="text-xs uppercase font-bold">{bid.from.nickName}</span>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Bids
