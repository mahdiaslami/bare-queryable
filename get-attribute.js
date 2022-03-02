function makeGetterFunction(key) {
    return (obj) => obj[key]
}

export default makeGetterFunction
