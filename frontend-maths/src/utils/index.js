export const includedIn = (set, object) => {
    return set.map(p => p.id).includes(object.id)
}

export const includedIn2 = (set, object) => {
    return object.filter(val => ! set.includes(val)).filter(({users}) => users.length > 0)
}

