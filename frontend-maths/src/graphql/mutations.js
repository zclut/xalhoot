import { gql } from '@apollo/client';

export const CREATE_ROOM = gql`
    mutation CreateRoom($user: String!) {
        createRoom(user: $user) {
            id
            users
            leader
            isOpen
            scores {
                id
                user
                points
            }
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

export const START_GAME = gql`
    mutation StartRoom($id: ID!) {
        startRoom(id: $id)
    }
`

export const KICK_USER_ROOM = gql`
    mutation kickUserRoom($id: ID!, $user: String!) {
        kickUserRoom(id: $id, user: $user)
    }
`

export const ADD_SCORE_TO_ROOM = gql`
    mutation AddScoreToRoom($id: ID!, $user: String!, $points: Int!) {
        addScoreToRoom(id: $id, user: $user, points: $points)
    }
`