const ButtonRoom = ({ value, handleSubmit }) => {
    return (
        <button className="btn btn-gray" type='submit' onClick={handleSubmit}>{value}</button>
    );
}

export default ButtonRoom;