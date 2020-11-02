import React from 'react'

const Users = ({ users, auctionData }) => {
    return (
        <div>
            {users.map(user => {
                const myTurn = user._id === auctionData.auction.turnOf._id
                return (
                    <div 
                        key={user._id} 
                        className={`${myTurn ? 'bg-teal-300' : 'bg-gray-300'} my-3 text-center py-3 rounded-md uppercase font-semibold text-white`}
                    >
                        <p>{user.nickName}</p>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Users
