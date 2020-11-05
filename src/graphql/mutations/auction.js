import { gql } from '@apollo/client'

export const CREATE_AUCTION = gql`
mutation auctionCreate($userId: ID!, $nickName: String!, $rules: AuctionRulesInput!) {
	createAuction(input: {
    userId: $userId,
    nickName: $nickName,
    rules: $rules
  }){
    _id
    name
  }
}
`

export const UPDATE_AUCTION_STATUS = gql`
  mutation updateAuctionStatus($auctionId: ID!, $newStatus: String!) {
    updateAuctionStatus(auctionId: $auctionId,  newStatus: $newStatus) {
      name
      status
    }
  }
`

export const UPDATE_AUCTION_USER_TURN = gql`
  mutation userTurn($auctionId: ID!, $userId: ID!) {
    updateAuctionUserTurn(auctionId: $auctionId, userId: $userId){
      turnOf{
        _id
        nickName
      }
    }
  }
`

export const UPDATE_AUCTION_PLAYER = gql`
  mutation auctionPlayer($playerId: ID!, $auctionId: ID!){
    updateAuctionPlayer(playerId: $playerId, auctionId: $auctionId){
      _id
      name
      role
      team
      paid
    }
  }
`

export const CLOSE_BID_OFFER = gql`
mutation closeBid($playerId: ID!, $auctionId: ID!){
  closeBidOffer(playerId: $playerId, auctionId: $auctionId){
    _id
    name
  }
}
`

export const ADD_BID = gql`
  mutation addBid($auctionId: ID!, $userId: ID!, $bidAmount: Int!) {
    createBid(
      auctionId: $auctionId,
      userId: $userId,
      bidAmount: $bidAmount
    ){
      from{
        nickName
      }
      bid
    }
  }
`