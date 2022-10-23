export const includedIn = (set, object) => {
    return set.map(p => p.id).includes(object.id)
}

export const concatItem = (prop, item) => {
    return prop.concat(item)
}

export const filterItemById = (prop, item) => {
    return prop.filter(i => i.id !== item)
}

export const setItem = (prop, item) => {
    return {
        ...prop,
        users: [ ...item.users ]
    }
}