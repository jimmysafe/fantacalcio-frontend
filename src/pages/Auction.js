import React, { useState } from 'react'
import { useSubscription } from '@apollo/client'
import { LIVE_AUCTION } from '../graphql/subscriptions/auction'
import { Redirect, useParams } from 'react-router-dom'
import Users from '../components/auction/Users'
import Players from '../components/auction/Players'
import jwt_decode from "jwt-decode";
import Bids from '../components/auction/Bids'
import BidActions from '../components/auction/BidActions'
import MyPlayers from '../components/auction/MyPlayers'
import AuctionComplete from './AuctionComplete'
import AuctionHeader from '../components/auction/AuctionHeader'
import AuctionNotification from '../components/auction/AuctionNotification'

const tabItems = [ 'Partecipanti', 'Asta', 'I Miei Giocatori' ]

const Auction = () => {
    const params = useParams()
    const authToken = window.localStorage.getItem('authToken')

    const { userId } = authToken ? jwt_decode(localStorage.getItem('authToken')) : { userId: '' }

    const [tab, setTab] = useState('Asta')

    const { 
        data: auctionData, 
        error: auctionError, 
        loading: auctionLoading 
    } = useSubscription(LIVE_AUCTION, { variables: { auctionName: params.auctionName } })

    if(auctionLoading) return <p>Loading...</p>
    if(auctionError) {
        console.log(auctionError)
        return <p>Error..</p>
    }

    const user = auctionData.auction.users.find(usr => usr._id === userId)
    const users = auctionData.auction.users
    const myTurn = userId === auctionData.auction.turnOf._id
    const highestBid = auctionData.auction.bids.length ? auctionData.auction.bids.reduce((x, y) => {
        return y.bid > x.bid ? y : x
    }) : null

    // console.log(auctionData)

    return (
        <>
        {!authToken 
            ? <Redirect to={`/auth/login?prev=/auction/${params.auctionName}`}/> 
            :  auctionData.auction.status === 'complete' 
                ?   <AuctionComplete auctionData={auctionData}/>
                :   
                <>
                    <div className="bg-darkBlue w-full">
                        <div className="container mx-auto flex justify-between items-center">
                            {tabItems.map(item => (
                                <div 
                                    key={item}
                                    className={`
                                        ${tab === item ? 'bg-lightBlue' : ''}
                                        flex-1 flex justify-center items-center text-white uppercase text-xs font-bold md:mx-1 py-6 cursor-pointer
                                    `}
                                    onClick={() => setTab(item)}
                                >
                                    <p>{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container mx-auto flex flex-1 justify-between relative">
                     
                        <section 
                            className={`
                                md:border md:border-gray-300 md:mx-1 m-0 flex-1 rounded-md z-10 md:block bg-bgGrey
                                ${tab === 'Partecipanti' ? 'block' : 'hidden'}
                            `}
                        >
                            <div className="p-5">
                                <Users users={users} auctionData={auctionData}/>
                            </div>
                        </section>

                        <section className="md:border md:border-gray-300 md:mx-1 m-0 flex-1 min-h-full rounded-md flex flex-col md:relative absolute w-full">
                            <AuctionHeader user={user} highestBid={highestBid} />
                            <AuctionNotification auctionData={auctionData} />
                            <div className="flex-1 flex flex-col">
                                <div className="flex-1">
                                    {auctionData.auction.bids.length > 0 &&
                                        <Bids auctionData={auctionData} highestBid={highestBid}/>
                                    }
                                </div>
                                <BidActions auctionData={auctionData} highestBid={highestBid}/>
                            </div>
                        </section>
                        
                        <section 
                            className={`
                            md:border md:border-gray-300 md:mx-1 m-0 flex-1 rounded-md z-10 md:block bg-bgGrey
                                ${tab === 'I Miei Giocatori' ? 'block' : 'hidden'}
                            `}
                        >
                            <MyPlayers players={user.players}/>
                        </section>
                        
                        <Players auctionData={auctionData} myTurn={myTurn}/>     
                    </div>           
                </>
        }
        </>
    )
}

export default Auction
