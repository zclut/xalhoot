const TopBar = ({ user, children }) => {
    return (
        <div className='w-full flex flex-row bg-gray-900 align-middle p-8 text-white items-center'>
            <span className='mr-auto'>User: <b>{user}</b></span>

            { children }
        </div>
    );
}

export default TopBar;