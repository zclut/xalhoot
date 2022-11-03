import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

// Components
import ButtonRoom from './ButtonRoom';
import TopBar from './TopBar';

// Queries, Mutations, Subscriptions and Utils
import { useSubscriptions } from '../hooks/useSubscriptions';
import { ROOMS_UPDATED } from '../graphql/subscriptions'
import { JOIN_ROOM, CREATE_ROOM } from '../graphql/mutations';
import { LIST_ROOMS } from '../graphql/queries'
import { includedIn2 } from '../utils';
import GameWaiting from './GameWaiting';

const Rooms = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')

    // Queries, Mutations and Subscriptions
    useSubscriptions(ROOMS_UPDATED, LIST_ROOMS, 'roomsUpdated', 'listRooms', includedIn2)
    const { loading, error, data } = useQuery(LIST_ROOMS);
    const [joinRoom] = useMutation(JOIN_ROOM);
    const [addRoom] = useMutation(CREATE_ROOM);

    // Handlers
    const handleJoinRoom = async (id) => {
        await joinRoom({ variables: { id: id, user: user } })
        navigate(`/room/${id}`)
    }

    const handleCreateRoom = async (e) => {
        e.preventDefault()
        const { data } = await addRoom({ variables: { user: user } })
        navigate(`/room/${data.createRoom.id}`)
    }

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <>
            <TopBar
                user={user}
            >
                <ButtonRoom
                    value="Create Room"
                    handleSubmit={handleCreateRoom}
                />
            </TopBar>

            <div className="container">
                {data.listRooms.filter(({ isOpen }) => isOpen).length === 0
                    ? <GameWaiting text={"No room has been created"} />
                    : <div className="container-rooms"> {
                        data.listRooms.map(({ id, users, leader, isOpen }) =>
                            (isOpen) && <div key={id} to={`/room/${id}`} onClick={() => handleJoinRoom(id)} className="w-full md:w-1/2 lg:w-1/3 p-2 cursor-pointer">
                                <div className="w-full p-4 rounded-lg hover:bg-gray-200/90 bg-white/90 border-l-[12px] bg-opacity-50 border-yellow-300">
                                    <div className="flex flex-col justify-center">
                                        <div className="text-lg text-black">{leader}'s room</div>
                                        <div className="text-sm text-gray-400">Players online - {users.length}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>
    )
}

export default Rooms;