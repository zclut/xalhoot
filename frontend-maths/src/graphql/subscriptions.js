import { gql } from '@apollo/client'

export const ROOMS_UPDATED = gql`
    subscription Subscription {
        roomsUpdated {
            id,
            users 
        }
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