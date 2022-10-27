const ButtonRoom = ({ value, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input className="btn btn-gray" type='submit' value={value} />
        </form>
    );
}

export default ButtonRoom;