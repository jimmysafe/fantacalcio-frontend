import { gql } from '@apollo/client'

export const LIVE_AUCTION = gql`
    subscription liveAuction($auctionName: String!){
        auction(auction: $auctionName){
            _id
            name
            status
            owner {
                _id
            }
            turnOf{
                _id
                nickName
            }
            users {
                _id
                nickName
            }
            bidPlayer {
                _id
                name
            }
            bids {
                bid
                from {
                    _id
                    nickName
                }
            }
        }
    }
`