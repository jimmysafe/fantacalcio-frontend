import React from 'react'
import { useMutation, useSubscription, useQuery } from '@apollo/client'
import { LIVE_AUCTION } from '../graphql/subscriptions/auction'
import { UPDATE_AUCTION_USER_TURN, CLOSE_BID_OFFER } from '../graphql/mutations/auction'
// import { GET_USER } from '../graphql/queries/user'
import { Redirect, useParams } from 'react-router-dom'
import Users from '../components/auction/Users'
import Players from '../components/auction/Players'
import jwt_decode from "jwt-decode";
import Bids from '../components/auction/Bids'
import BidActions from '../components/auction/BidActions'
import MyPlayers from '../components/auction/MyPlayers'

const Auction = () => {
    const params = useParams()
    const authToken = window.localStorage.getItem('authToken')

    const { userId } = authToken ? jwt_decode(localStorage.getItem('authToken')) : { userId: '' }

    const [updateUserTurn] = useMutation(UPDATE_AUCTION_USER_TURN)
    const [closeBid] = useMutation(CLOSE_BID_OFFER)

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
    const userCredits = user ? user.credits : 0
    const users = auctionData.auction.users
    const myTurn = userId === auctionData.auction.turnOf._id
    const highestBid = auctionData.auction.bids.length ? auctionData.auction.bids.reduce((x, y) => {
        return y.bid > x.bid ? y : x
    }) : null

    const closeOffer = () => {
        const auctionId = auctionData.auction._id
        const playerId = auctionData.auction.bidPlayer._id

        closeBid({ 
            variables: { auctionId, playerId }, 
            // refetchQueries: [{ query: GET_USER, variables: { userId } }] 
        })
    }

    const nextTurn = () => {
        const maxIndex = auctionData.auction.users.length - 1
        const currentIndex = auctionData.auction.users.findIndex(user => user._id === auctionData.auction.turnOf._id)
        let nextInline

        if (currentIndex === maxIndex || currentIndex > maxIndex) {
            nextInline = 0
        } else {
            nextInline = currentIndex + 1
        }
        
        updateUserTurn({ variables: { auctionId: auctionData.auction._id, userId: auctionData.auction.users[nextInline]._id } })
    }

    return (
        <>
        {!authToken ? <Redirect to={`/auth/login?prev=/auction/${params.auctionName}`}/> : (
            <div className="container mx-auto py-5 min-h-screen flex justify-between">
                <section className="bg-white shadow-md mx-1 w-1/4 rounded-md">
                    <div className="bg-gray-900 text-white p-5 uppercase font-bold text-sm text-center rounded-t-md">
                        <h2>Partecipanti</h2>
                    </div>
                    <div className="p-5">
                        <Users users={users} auctionData={auctionData}/>
                    </div>
                </section>
                <section className="bg-white shadow-md mx-1 w-2/4 min-h-full rounded-md flex flex-col">
                    <div className="bg-gray-900 text-white p-5 uppercase font-bold text-sm text-center rounded-t-md">
                        <h2>Asta</h2>
                    </div>
                    <div className="p-5 flex justify-between items-center shadow-sm text-sm uppercase font-semibold">
                        {userCredits &&
                            <div>
                                Crediti:{" "}
                                <span className="text-white bg-red-500 px-3 py-1 rounded-md">{userCredits}</span>
                            </div>
                        }
                        {highestBid &&
                        <div>
                                Miglior Offerta:{" "}
                                <span className="text-white bg-teal-400 px-3 py-1 rounded-md">{highestBid.from.nickName}: {highestBid.bid}</span>
                        </div>
                        }
                    </div>
                    <div className="p-5 shadow-sm rounded-md m-5 bg-red-500 text-white text-center uppercase text-sm font-semibold">
                        {auctionData.auction.bidPlayer ?
                            <h3 className="font-bold">{auctionData.auction.bidPlayer.name}</h3>
                        :
                            <h3>{auctionData.auction.turnOf.nickName} sta scegliendo un giocatore..</h3>
                        }
                    </div>
                    <div className="flex-1 flex flex-col">
                        {auctionData.auction.bids.length > 0 &&
                            <Bids auctionData={auctionData} highestBid={highestBid}/>
                        }
                        <div className="p-5">
                            <BidActions auctionData={auctionData} highestBid={highestBid}/>
                        </div>
                    </div>
                </section>
                <section className="bg-white shadow-md mx-1 w-1/4 rounded-md">
                    <div className="bg-gray-900 text-white p-5 uppercase font-bold text-sm text-center rounded-t-md">
                        <h2>La Mia Squadra</h2>
                    </div>
                    <MyPlayers players={user.players}/>
                </section>
                <Players auctionData={auctionData} myTurn={myTurn}/>     
            </div>
        )}
                {/* to be removed */}
                {/* <button onClick={() => nextTurn()}> nextTurn</button>  */}
                {/* <button onClick={() => closeOffer()}>Close Bid</button>  */}
        </>
    )
}

export default Auction
