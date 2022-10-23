import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { useSubscriptions } from '../hooks/useSubscriptions';
import CreateRoom from './CreateRoom';
import { Link } from 'react-router-dom'

// Queries, Mutations and Subscriptions
import { LIST_ROOMS } from '../graphql/queries'
import { ROOM_CREATED, ROOM_DELETED } from '../graphql/subscriptions'
import { JOIN_ROOM } from '../graphql/mutations';

import { concatItem, filterItemById } from '../utils';

const Rooms = ({ user }) => {
    useSubscriptions(ROOM_CREATED, LIST_ROOMS, 'roomCreated', 'listRooms', concatItem)
    // TODO: Room updated
    useSubscriptions(ROOM_DELETED, LIST_ROOMS, 'roomDeleted', 'listRooms', filterItemById)
    const { loading, error, data } = useQuery(LIST_ROOMS);

    const [joinRoom] = useMutation(JOIN_ROOM);

    const handleJoinRoom = async (id) => {
        await joinRoom({ variables: { id: id, user: user } })
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <div className='top-bar'>
                <span className="top-left">User: <b>{user}</b></span>

                <CreateRoom
                    user={user}
                />
            </div>

            {data.listRooms.length === 0
                ? <h1>No hay ninguna sala creada. 😒</h1>
                : data.listRooms.map(({ id, users }) => {
                    return <Link key={id} to={`/room/${id}`} onClick={() => handleJoinRoom(id)} state={{ user: user }}>
                        <h3> Room - {id} | Online - {users.length}</h3>
                    </Link>
                })
            }
        </>
    );
}

export default Rooms;