const TopBar = ({ user, children }) => {
    return (
        <div className='w-full flex flex-row align-middle p-6 text-white items-center'>
            <span className='mr-auto'>User: <b>{user}</b></span>

            {children}
        </div>
    );
}

export default TopBar;