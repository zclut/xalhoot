import { gql } from '@apollo/client';

export const LIST_ROOMS = gql`
    query ListRooms {
        listRooms {
            id
            users 
        }
    }
`

export const GET_ROOM = gql`
    query GetRoom($id: ID!) {
        getRoom(id: $id) {
            id
            users
        }
    }
`