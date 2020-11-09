import React from 'react'

const Bid = ({ bid, from, opacity }) => {
    return (
        <div className={`
        bg-white rounded p-3 shadow-lg flex justify-between items-center text-sm uppercase font-semibold text-darkGrey w-full mb-2
          ${opacity ? `opacity-${opacity}` : ''}
        `}>
            <p>{from}</p>
            <div className="bg-gold rounded-sm py-2 px-3">
                {bid}
            </div>
        </div>
    )
}

export default Bid
