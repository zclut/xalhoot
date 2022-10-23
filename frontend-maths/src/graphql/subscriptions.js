import { gql } from '@apollo/client'

export const ROOM_CREATED = gql`
    subscription Subscription {
        roomCreated {
            id,
            users 
        }
    }
`

export const ROOM_DELETED = gql`
    subscription Subscription {
        roomDeleted
    }
`

export const ROOM_USER_JOINED = gql`
    subscription RoomUserJoined {
        roomUserJoined {
            id
            users
        }
    }
`

export const ROOM_USER_LEFT = gql`
    subscription RoomUserLeft {
        roomUserLeft {
            id
            users
        }
    }
`