import React from 'react'
import { GET_USER } from '../../graphql/queries/user'
import { useQuery } from '@apollo/client'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const DashboardAuctions = () => {
    const history = useHistory()
    const { userId } = jwt_decode(localStorage.getItem('authToken'));
    const { data: userData, loading } = useQuery(GET_USER, { variables: { userId } })

    if(loading) return <p>Loading..</p>

    const auctions = userData && userData.user && userData.user.auctions
    
    return (
        <div className="w-full flex px-5 justify-around flex-wrap" style={{ maxWidth: 400 }}>
            {auctions && auctions.map(auction => (
                <div 
                    key={auction._id} 
                    className="cursor-pointer my-5 rounded-md shadow-md bg-white p-6 w-full" 
                    onClick={() => {
                        const url = auction.status === 'pending' ? `/users/${auction.name}` : `/auction/${auction.name}`
                        history.push(url)
                    }}
                >
                    <p className="mb-3 text-xs font-semibold uppercase">Codice Invito: <span className="font-bold lowercase text-sm">{auction.name}</span></p>
                    <p className="text-xs font-semibold uppercase">Stato Asta:{" "}
                        <span 
                            className={`uppercase font-bold text-xs text-white px-5 py-1 rounded-md ${auction.status === 'pending' ? 'bg-red-500' : 'bg-teal-400'}`}
                        >{auction.status}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default DashboardAuctions
