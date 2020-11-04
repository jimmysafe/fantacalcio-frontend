import { gql } from '@apollo/client'

export const GET_PLAYERS = gql`
  query {
    players {
        _id
        name
        role
        team
        paid
    }
  }
`
export const PLAYERS_ALLOCATION = gql`
query playersAllocation($auctionId: ID!) {
  auctionUserPlayersAllocation(auctionId: $auctionId){
    P
    D
    C
    A
  }
}
`

export const GET_GOALKEEPERS = gql`
query {
  goalkeepers{
    _id
    name
    team
    role
  }
}
`

export const GET_DEFENDERS = gql`
query {
  defenders{
    _id
    name
    team
    role
  }
}
`

export const GET_MIDFIELDERS = gql`
query {
  midfielders{
    _id
    name
    team
    role
  }
}
`

export const GET_STRIKERS = gql`
query {
  strikers{
    _id
    name
    team
    role
  }
}
`


