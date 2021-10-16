import query from './query.js'

function asyncQuery(promise) {
    const parent = query()

    parent.promise = promise

    parent.do = function (callback) {
        return this.promise.then(data => this.filter(data)).then(callback)
    }

    return parent
}

export default asyncQuery
