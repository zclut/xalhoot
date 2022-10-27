import { gql } from '@apollo/client';

export const CREATE_ROOM = gql`
    mutation CreateRoom($user: String!) {
        createRoom(user: $user) {
            id
            users
            leader
            isOpen
        }
    }
`

export const JOIN_ROOM = gql`
    mutation JoinRoom($id: ID!, $user: String!) {
        joinRoom(id: $id, user: $user) 
    }
`

export const LEAVE_ROOM = gql`
    mutation Mutation($id: ID!, $user: String!) {
        leaveRoom(id: $id, user: $user)
    }
`