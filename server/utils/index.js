export const deleteUserAndRoom = (rooms, user) => {
    rooms.forEach((room, index) => {
        room.users = room.users.filter(u => u !== user)
        if (room.users.length === 0) {
            rooms.splice(index, 1)
        }
    })
    return rooms
}

export const disconnectUser = (users, user) => {
    users.forEach((u, index) => {
        if (u === user) users.splice(index, 1)
    })
    return users
}