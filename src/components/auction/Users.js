import React, { useState, Fragment } from 'react'
import MyPlayers from './MyPlayers'
import { FiChevronRight } from "react-icons/fi";
import {useSpring, animated} from 'react-spring'



const Users = ({ users }) => {

    const [userPlayers, showUserPlayers] = useState(null)
    
    const arrowAnimation = useSpring({
        transform: userPlayers !== null ? 'rotate(90deg)' : 'rotate(0deg)'
    })

    return (
        <div>
            {users.map((user, i) => {
                return (
                    <Fragment key={user._id} >
                    <div 
                        onClick={() => userPlayers === i ? showUserPlayers(null) : showUserPlayers(i)}
                        className="relative border border-gray-300 my-3 rounded-sm text-center py-3 uppercase font-semibold text-gray-900 cursor-pointer bg-white text-sm"
                    >
                        <p>{user.nickName}</p>
                        <div className="absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                            <animated.div style={arrowAnimation}>
                                <FiChevronRight color="#FFC400" size="1.5rem"/>
                            </animated.div>
                        </div>
                    </div>
                    {userPlayers === i &&
                        <div className="px-2" >
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
