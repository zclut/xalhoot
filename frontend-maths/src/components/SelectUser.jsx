import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const SelectUser = ({ user, onChange }) => {
    const navigate = useNavigate()
    const inputRef = useRef(null);
    
    const handleClick = () => {
        const user = inputRef.current.value
        if (!user) return
        onChange(inputRef.current.value)
    }

    useEffect(() => {
        if (user) navigate('/rooms')
    }, [user])

    return (
        <>
            <input ref={inputRef} type="text" />
            <button onClick={handleClick}>Set User</button>
        </>
    );
}

export default SelectUser;