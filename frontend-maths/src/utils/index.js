export const includedIn = (set, object) => {
    return set.map(p => p.id).includes(object.id)
}

export const setItem = (prop, item) => {
    return {
        ...prop,
        users: [ ...item.users ]
    }
}
