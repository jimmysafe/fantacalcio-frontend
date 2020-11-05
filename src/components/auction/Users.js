import React, { useState, Fragment } from 'react'
import MyPlayers from './MyPlayers'

const Users = ({ users, auctionData }) => {

    const [userPlayers, showUserPlayers] = useState()

    return (
        <div>
            {users.map((user, i) => {
                const myTurn = user._id === auctionData.auction.turnOf._id
                return (
                    <Fragment key={user._id} >
                    <div 
                        onClick={() => userPlayers === i ? showUserPlayers(null) : showUserPlayers(i)}
                        className={`${myTurn ? 'border-teal-500' : 'bg-white border-gray-300'} border-2 my-3 text-center py-2 uppercase font-semibold text-gray-900 cursor-pointer`}
                    >
                        <p>{user.nickName}</p>
                    </div>
                    {userPlayers === i &&
                        <div className="p-2 bg-gray-200">
                            <MyPlayers players={user.players}/>
                        </div>
                    }
                    </Fragment>
                )
            }
            )}
        </div>
    )
}

export default Users
