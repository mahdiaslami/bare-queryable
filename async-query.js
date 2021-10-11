import query from './query.js'

function asyncQuery(promise) {
    return {
        ...query([]),

        promise: promise,

        do(callback) {
            return this.promise.then(this.filter()).then(callback)
        },
    }
}

export default asyncQuery
