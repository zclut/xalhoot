import { gql } from '@apollo/client';

export const LIST_ROOMS = gql`
    query ListRooms {
        listRooms {
            id
            users
            leader
            isOpen
        }
    }
`

export const GET_ROOM = gql`
    query GetRoom($id: ID!) {
        getRoom(id: $id) {
            id
            users
            leader
            isOpen
        }
    }
`