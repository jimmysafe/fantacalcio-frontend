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

    const auctions = userData && userData.user.auctions
    
    return (
        <div className="w-full flex px-5 justify-around flex-wrap">
            {auctions && auctions.map(auction => (
                <div key={auction._id} className="cursor-pointer my-5 rounded-md shadow-md bg-white p-6 w-2/5" onClick={() => history.push(`/auction/${auction.name}`)}>
                    <p>Codice Invito: <span className="font-semibold">{auction.name}</span></p>
                    <p>Stato Asta: <span className="uppercase font-bold text-xs bg-teal-400 text-white px-5 py-1 rounded-md">{auction.status}</span></p>
                </div>
            ))}
        </div>
    )
}

export default DashboardAuctions
