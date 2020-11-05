import { gql } from '@apollo/client'

export const LIVE_AUCTION = gql`
    subscription liveAuction($auctionName: String!){
        auction(auction: $auctionName){
            _id
            name
            status
            timer
            rules{
                goalkeepers,
                defenders,
                midfielders,
                strikers
            }
            owner {
                _id
            }
            turnOf{
                _id
                nickName
            }
            users{
                _id
                nickName
                ready
                credits
                players{
                    player{
                    _id
                    name
                    role
                    team
                }
                amount_paid
                }
            }
            bidPlayer {
                _id
                name
                role
            }
            bids {
                bid
                from {
                    _id
                    nickName
                }
            }
            chosenPlayers
        }
    }
`