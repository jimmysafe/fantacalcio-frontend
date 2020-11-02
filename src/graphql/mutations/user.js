import { gql } from '@apollo/client'


export const REGISTER_USER = gql`
    mutation registerUser($email: String!, $password: String!, $nickName: String!) {
        createUser(input: { 
            email: $email, 
            password: $password,
            nickName: $nickName
        }){
            email
            nickName
            password
        }
    }
`

export const LOGIN_USER = gql`
    mutation userLogin($email: String!, $password: String!) {
        loginUser(
            email: $email, 
            password: $password
        ){
            userId
            token
        }
    }

`

export const ASSOCIATE_USER_TO_AUCTION = gql`
mutation associateUserToAuction($userId: ID!, $inviteCode: String!) {
  associateUserToAuction(
    userId: $userId, 
    inviteCode: $inviteCode
  ){
    name
    users{
      nickName
    }
  }
}
`

export const USER_READY = gql`
    mutation userReady($userId: ID!, $auctionName: String!) {
        changeUserReadiness(userId: $userId, auctionName: $auctionName){
            nickName
            ready
        }
    }
`
  