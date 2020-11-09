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

    const translateAuctionStatus = (status) => {
        switch(status){
            case 'pending':
                return 'In Attesa'
            case 'started':
                return 'In Corso'
            case 'complete':
                return 'Terminata'
            default:
                return 'In Attesa'
        }
    }
    
    return ( 
        <div className="w-full flex md:px-5 justify-around flex-wrap mx-auto" style={{ maxWidth: 450 }}>
            {auctions && auctions.map(auction => (
                <div 
                    key={auction._id} 
                    className="cursor-pointer my-2 rounded shadow-lg bg-white p-8 w-full" 
                    onClick={() => {
                        const url = auction.status === 'pending' ? `/users/${auction.name}` : `/auction/${auction.name}`
                        history.push(url)
                    }}
                >
                    <p className="mb-4 text-xs text-lightGrey tracking-wide font-semibold uppercase">Asta 
                        <span className="font-bold lowercase text-sm text-darkBlue inline-block ml-4">{auction.nickName}</span>
                    </p>                    
                    <p className="mb-4 text-xs text-lightGrey tracking-wide font-semibold uppercase">Codice Invito 
                        <span className="font-bold lowercase text-sm text-darkBlue inline-block ml-4">{auction.name}</span>
                    </p>
                    <p className="text-xs text-lightGrey tracking-wide font-semibold uppercase">Stato Asta
                        <span 
                            className={`uppercase font-bold text-xs text-white px-4 py-2 rounded inline-block ml-4
                                ${auction.status === 'pending' ? 'bg-lightBlue' : auction.status === 'complete' ? 'bg-green-500' : 'bg-gold'}`
                            }
                        >{translateAuctionStatus(auction.status)}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default DashboardAuctions
