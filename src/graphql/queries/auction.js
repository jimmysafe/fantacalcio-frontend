import { gql } from '@apollo/client'

export const GET_AUCTION = gql`
  query getAuction($auctionName: String!) {
    auction(auctionName: $auctionName){
      _id
      name
      status
      owner{
        _id
        ready
        nickName
      }
      users{
        _id
        ready
        nickName
        auctions {
          _id
          name
        }
      }
    }
  }
`

