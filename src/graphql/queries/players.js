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

