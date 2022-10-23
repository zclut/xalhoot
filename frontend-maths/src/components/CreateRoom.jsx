import { useMutation } from '@apollo/client'
import { CREATE_ROOM } from '../graphql/mutations'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const CreateRoom = ({ user }) => {
    const navigate = useNavigate()
    const [addRoom, { data, loading, error }] = useMutation(CREATE_ROOM);

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addRoom({ variables: { user: user } })
    }

    useEffect(() => {
        if (data) navigate(`/room/${data.createRoom.id}`, { state: { user: user } })
    }, [data])

    return (
        <form onSubmit={handleSubmit}>
            <input className="top-right" type='submit' value="Create Room" />
        </form>
    );
}

export default CreateRoom;