import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useSubscriptions } from '../hooks/useSubscriptions'
import { useEffect } from 'react'

// Queries, Mutations and Subscriptions
import { LEAVE_ROOM } from '../graphql/mutations'
import { ROOM_USER_JOINED, ROOM_USER_LEFT } from '../graphql/subscriptions'
import { GET_ROOM } from '../graphql/queries'
import { setItem } from '../utils'

const Room = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { user } = state || {};
    const { id } = useParams()

    useSubscriptions(ROOM_USER_JOINED, GET_ROOM, 'roomUserJoined', 'getRoom', setItem)
    useSubscriptions(ROOM_USER_LEFT, GET_ROOM, 'roomUserLeft', 'getRoom', setItem)

    const { loading, error, data } = useQuery(GET_ROOM, { variables: { id: id } }, 
        { notifyOnNetworkStatusChange: true }
    );

    const [leaveRoom, { data: dataLeave }] = useMutation(LEAVE_ROOM);

    const handleSubmit = async (e) => {
        e.preventDefault()

        await leaveRoom({ variables: { id: id, user: user } })
    }

    useEffect(() => {
        if (dataLeave) navigate(`/rooms`)
    }, [dataLeave])


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input className="top-left" type='submit' value="Leave the room" />
            </form>
            <span className="top-right">Online - {data.getRoom.users.length}</span>
            <h1>{id}</h1>
        </>
    );
}

export default Room;