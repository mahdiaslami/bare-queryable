function makeGetterFunction(pathToKey) {
    const keys = pathToKey.split('.')

    switch (keys.length) {
    case 1:
        return (obj) => obj[keys[0]]
    case 2:
        return (obj) => obj[keys[0]][keys[1]]
    case 3:
        return (obj) => obj[keys[0]][keys[1]][keys[2]]
    case 4:
        return (obj) => obj[keys[0]][keys[1]][keys[2]][keys[3]]
    default:
        throw new Error('path to key is too long.')
    }
}

export default makeGetterFunction
