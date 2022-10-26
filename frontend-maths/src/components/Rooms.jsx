import { useQuery, useMutation } from '@apollo/client'
import { useSubscriptions } from '../hooks/useSubscriptions';
import CreateRoom from './CreateRoom';
import { Link } from 'react-router-dom'

// Queries, Mutations and Subscriptions
import { LIST_ROOMS } from '../graphql/queries'
import { ROOMS_UPDATED } from '../graphql/subscriptions'
import { JOIN_ROOM } from '../graphql/mutations';

import { includedIn } from '../utils';

const Rooms = ({ user }) => {
    useSubscriptions(ROOMS_UPDATED, LIST_ROOMS, 'roomsUpdated', 'listRooms', includedIn)
    const { loading, error, data } = useQuery(LIST_ROOMS);

    const [joinRoom] = useMutation(JOIN_ROOM);

    const handleJoinRoom = async (id) => {
        await joinRoom({ variables: { id: id, user: user } })
    }

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <div className='w-full flex flex-row bg-gray-900 align-middle p-8 text-white items-center'>
                <span className='mr-auto'>User: <b>{user}</b></span>

                <CreateRoom
                    user={user}
                />
            </div>

            <div className="container">
                <div className="container-rooms">
                    {data.listRooms.length === 0
                        ? <h1 className='text-4xl'>No hay ninguna sala creada. 😒</h1>
                        : data.listRooms.map(({ id, users }) => {
                            return <Link key={id} to={`/room/${id}`} onClick={() => handleJoinRoom(id)} state={{ user: user }} className="w-full md:w-1/2 lg:w-1/3 px-2 py-2">
                                <div className="widget w-full p-4 rounded-lg hover:bg-gray-300 bg-gray-200 border-l-4 border-gray-600">
                                    <div className="flex flex-col justify-center">
                                        <div className="text-lg text-black">{id}</div>
                                        <div className="text-sm text-gray-400">Players online - {users.length}</div>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Rooms;