import { gql } from 'apollo-server'
import { PubSub } from 'graphql-subscriptions'
import { rooms, users } from './data.js'
import { v4 } from 'uuid'

const pubsub = new PubSub()

const SUBSCRIPTIONS_EVENTS = {
    ROOM_CREATED: 'ROOM_CREATED',
    ROOM_DELETED: 'ROOM_DELETED',
    ROOM_USER_JOINED: 'ROOM_USER_JOINED',
    ROOM_USER_LEFT: 'ROOM_USER_LEFT'
}

export const typeDefs = gql`
    type Room {
        id: ID!
        users: [String]
    }

    type Query {
        listRooms: [Room]
        getRoom(id: ID!): Room
    }

    type Mutation {
        createRoom(user: String!): Room
        joinRoom(id: ID!, user: String!): String
        leaveRoom(id: ID!, user: String!): String
    }

    type Subscription {
        roomCreated: Room
        roomDeleted: ID
        roomUserJoined: Room
        roomUserLeft: Room
    }
`

export const resolvers = {
    Query: {
        listRooms: (_, args) => {
            return rooms
        },
        getRoom: (_, { id }) => {
            return rooms.find(r => r.id === id)
        }
    },
    Mutation: {
        createRoom: (_, { user }) => {
            // Create room item
            const room = {
                id: v4(),
                users: [user]
            }
            // Add room to data
            rooms.push(room)

            // Add event to subscription
            pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOM_CREATED, { roomCreated: room })
            pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOM_USER_JOINED, { roomUserJoined: room })
            return room
        },
        joinRoom: (_, { id, user }) => {
            // Search room by id and add user
            const index = rooms.findIndex(r => r.id === id)
            if (rooms[index]?.users.includes(user))
                throw new Error('user already exists in the room')
                
            rooms[index]?.users.push(user)

            console.log(rooms[index]);

            // Add user to room
            pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOM_USER_JOINED, { roomUserJoined: rooms[index] })
            return `${user} joined the room`
        },
        leaveRoom: (_, { id, user }) => {
            // Search room by id and add user
            const index = rooms.findIndex(r => r.id === id)
            if (!rooms[index]?.users.includes(user))
                throw new Error('user dont exists')

            // Remove user from room
            const u = rooms[index].users.findIndex(u => u == user)
            rooms[index]?.users.splice(u, 1)

            console.log(rooms[index])
            pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOM_USER_LEFT, { roomUserLeft: rooms[index] })

            // If room dont have users, delete room
            if (rooms[index]?.users.length === 0) {
                rooms.splice(index, 1)
                pubsub.publish(SUBSCRIPTIONS_EVENTS.ROOM_DELETED, { roomDeleted: id })
            }

            return `${user} left the room`
        }
    },
    Subscription: {
        roomCreated: {
            subscribe: () => pubsub.asyncIterator(SUBSCRIPTIONS_EVENTS.ROOM_CREATED)
        },
        roomDeleted: {
            subscribe: () => pubsub.asyncIterator(SUBSCRIPTIONS_EVENTS.ROOM_DELETED)
        },
        roomUserJoined: {
            subscribe: () => pubsub.asyncIterator(SUBSCRIPTIONS_EVENTS.ROOM_USER_JOINED)
        },
        roomUserLeft: {
            subscribe: () => pubsub.asyncIterator(SUBSCRIPTIONS_EVENTS.ROOM_USER_LEFT)
        },
    }
}