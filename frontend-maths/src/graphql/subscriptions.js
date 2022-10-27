import { gql } from '@apollo/client'

export const ROOMS_UPDATED = gql`
    subscription Subscription {
        roomsUpdated {
            id
            users
            leader
            isOpen
        }
    }
`

export const ROOM_USER_JOINED = gql`
    subscription RoomUserJoined {
        roomUserJoined {
            id
            users
            leader
            isOpen
        }
    }
`

export const ROOM_USER_LEFT = gql`
    subscription RoomUserLeft {
        roomUserLeft {
            id
            users
            leader
            isOpen
        }
    }
`