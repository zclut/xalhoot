import { GET_ROOM } from "../graphql/queries";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const GameFinished = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_ROOM, { variables: { id: id } })

    const [scores, setScores] = useState([])

    useEffect(() => {
        const copyScores = [...data.getRoom.scores]
        setScores(copyScores.sort((a, b) => b.points - a.points))
    }, [data])

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return (
        <div className="shadow overflow-hidden rounded-3xl">
            <table className="min-w-full bg-white">
                <thead className="bg-color-yellow text-black">
                    <tr>
                        <th className="w-1/3 py-3 px-4 uppercase font-bold text-sm">User</th>
                        <th className="w-1/3 py-3 px-4 uppercase font-bold text-sm">Score</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {scores.slice(0, 3).map(({ user, points }, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} text-center`}>
                            <td className="p-4">{user}</td>
                            <td className="p-4">{points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GameFinished;