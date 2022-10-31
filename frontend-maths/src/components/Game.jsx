import { useMutation } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

// Icons
import { BiExit, BiTime } from "react-icons/bi";

// Components
import TopBar from './TopBar'
import ButtonRoom from './ButtonRoom'

// Queries, Mutations, Subscriptions and Utils
import { useSubscriptions } from "../hooks/useSubscriptions";
import { ROOMS_UPDATED, ROOM_USER_JOINED, ROOM_USER_LEFT } from "../graphql/subscriptions";
import { ADD_SCORE_TO_ROOM, LEAVE_ROOM } from "../graphql/mutations";
import { includedIn, includedIn2 } from "../utils";
import { GET_ROOM, LIST_ROOMS } from "../graphql/queries";
import { useEffect, useState } from "react";
import { data } from "../assets/data";
import GameWaiting from "./GameWaiting";
import GameFinished from "./GameFinished";

const SECONDS_PER_QUESTION = 5

const Game = () => {
    const navigate = useNavigate()
    const user = localStorage.getItem('user')
    const { id } = useParams()

    const [time, setTime] = useState(SECONDS_PER_QUESTION)
    const [questions, setQuestions] = useState(data)
    const [question, setQuestion] = useState(0)
    const [finished, setFinished] = useState(false)

    const [answers, setAnswers] = useState([])

    // Queries, Mutations and Subscriptions
    useSubscriptions(ROOM_USER_JOINED, GET_ROOM, 'roomUserJoined', 'getRoom', includedIn)
    useSubscriptions(ROOM_USER_LEFT, GET_ROOM, 'roomUserLeft', 'getRoom', includedIn2)
    useSubscriptions(ROOMS_UPDATED, LIST_ROOMS, 'roomsUpdated', 'listRooms', includedIn2)
    const [leaveRoom] = useMutation(LEAVE_ROOM)
    const [addScore] = useMutation(ADD_SCORE_TO_ROOM)


    // function to check if answer its correct
    const checkAnswer = (correct) => setAnswers([...answers, { correct, points: (correct) ? time * 10 : 0 }])

    useEffect(() => {
        if (question === questions.length - 1 && time === 0)
            setFinished(true)

        if (!finished) {
            // Set interval to decrease time
            const interval = setInterval(() => {
                setTime(time - 1)
            }, 1000)
            // Clear interval when time its 0
            if (time === 0) {
                clearInterval(interval)
                setQuestion(question + 1)
                setTime(SECONDS_PER_QUESTION)
                if (answers.length < question + 1)
                    checkAnswer(false)
            }
            // Clear interval when finish
            return () => clearInterval(interval)
        } else {
            const points = answers.reduce((acc, { points }) => acc + points, 0)
            addScore({ variables: { id: id, user: user, points: points } })
        }
    }, [time, finished])

    // Handlers
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!finished) await leaveRoom({ variables: { id: id, user: user } })
        navigate('/rooms')
    }
    // return <GameFinished />

    return (
        <>
            <TopBar
                user={user}
            >
                <ButtonRoom
                    value={<BiExit />}
                    handleSubmit={handleSubmit}
                />
            </TopBar>

            <div className="container h-[88vh]">
                <div className='absolute flex flex-row top-16 left-4 text-gray-200 text-2xl items-center px-2 rounded-full'>
                    {!finished
                        ? <>
                            <BiTime />
                            {time}
                        </>
                        : null
                    }
                </div>

                {!finished
                    ? (answers.length === question + 1)
                        ? <GameWaiting />
                        : <>
                            <div className="w-full p-4 rounded-lg bg-color-yellow mb-3">
                                <h1 className="text-2xl text-black text-center">{questions[question]?.question}</h1>
                            </div>

                            {questions[question].answers.map(({ text, correct }) => (
                                <div key={text} className="w-full p-4 rounded-lg hover:bg-gray-200/90 bg-white/90 mb-3 cursor-pointer" onClick={() => checkAnswer(correct)}>
                                    <h1 className="text-justify text-black">{text}</h1>
                                </div>
                            ))}
                        </>
                    : <GameFinished />
                }

            </div>
        </>

    );
}

export default Game;