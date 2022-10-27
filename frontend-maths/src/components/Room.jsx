import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useSubscriptions } from '../hooks/useSubscriptions'
import { useEffect } from 'react'

// Queries, Mutations and Subscriptions
import { LEAVE_ROOM } from '../graphql/mutations'
import { ROOM_USER_JOINED, ROOM_USER_LEFT, ROOMS_UPDATED } from '../graphql/subscriptions'
import { GET_ROOM, LIST_ROOMS } from '../graphql/queries'
import { includedIn, includedIn2 } from '../utils'
import TopBar from './TopBar'
import ButtonRoom from './ButtonRoom'

const Room = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { user } = state || {};
    const { id } = useParams()

    useSubscriptions(ROOM_USER_JOINED, GET_ROOM, 'roomUserJoined', 'getRoom', includedIn)
    useSubscriptions(ROOM_USER_LEFT, GET_ROOM, 'roomUserLeft', 'getRoom', includedIn)
    useSubscriptions(ROOMS_UPDATED, LIST_ROOMS, 'roomsUpdated', 'listRooms', includedIn2)

    const { loading, error, data } = useQuery(GET_ROOM, { variables: { id: id } },
        { notifyOnNetworkStatusChange: true }
    );

    const [leaveRoom, { data: dataLeave }] = useMutation(LEAVE_ROOM);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await leaveRoom({ variables: { id: id, user: user } })
        navigate('/rooms')
    }

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <TopBar
                user={user}
            >
                <ButtonRoom
                    value="Leave the room"
                    handleSubmit={handleSubmit}
                />

            </TopBar>

            <span className="top-right">Online - {data.getRoom.users.length}</span>
            <h1>{id}</h1>
        </>
    );
}

export default Room;