import query from './query.js'

function asyncQuery(promise) {
    const parent = query()

    parent.promise = promise

    parent.do = function (callback) {
        return this.promise.then(this.filter()).then(callback)
    }

    return parent
}

export default asyncQuery
