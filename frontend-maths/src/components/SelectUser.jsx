import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const SelectUser = ({ user, onChange }) => {
    const navigate = useNavigate()
    const inputRef = useRef(null);

    const handleOnClick = () => {
        const user = inputRef.current.value
        localStorage.setItem('user', user)
        if (!user) return
        onChange(inputRef.current.value)
    }

    useEffect(() => {
        if (user) navigate('/rooms')
    }, [user])

    return (
        <div className="flex h-screen">
            <div className="flex flex-col space-y-2 m-auto">
                <h1 className="text-center text-white text-2xl mb-2 uppercase">Enter your username</h1>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ref={inputRef} type="text" placeholder="Juan"/>
                <button className="btn btn-gray" onClick={handleOnClick}>Set User</button>
            </div>
        </div>
    );
}

export default SelectUser;