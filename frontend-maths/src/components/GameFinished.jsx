import { useState } from "react";
import { useEffect } from "react";

const GameFinished = () => {

    const data = [
        {
            id: "90052fe7-0980-4aff-8be6-56c03d8b91ea",
            user: "Jose",
            points: 110
        },
        {
            id: "1069fd9b-ae2c-4bb1-a32f-5025275390f9",
            user: "Juan",
            points: 0
        },
        {
            id: "90052fe7-0980-4aff-8be6-56c03d8b922a",
            user: "Ja",
            points: 70
        },
        {
            id: "90052fe7-0980-4aff-8be6-56c03d8b933",
            user: "Fa",
            points: 10
        },
    ]

    const [ scores, setScores ] = useState(data)

    useEffect(() => {
        // Order data by points
        const ordered = scores.sort((a, b) => b.points - a.points)
        setScores(ordered)
    }, [])

    return (
        <>
            {scores.slice(0, 3).map(({ user, points }, index) => (
                <div key={index}>
                    <h3 className="text-white text-4xl">{user} - {points}</h3>
                </div>
            ))}
        </>
    );
}

export default GameFinished;