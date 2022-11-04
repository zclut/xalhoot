const GameWaiting = ({ text }) => {
    return (
        <div className="flex h-full">
            <div className="flex flex-col space-y-2 m-auto">
                <h1 className="md:text-4xl text-3xl text-white text-center">{text}</h1>
                <span className="loader"></span>
            </div>
        </div>
    );
}

export default GameWaiting;