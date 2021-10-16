import query from './query.js'

function asyncQuery(promise) {
    const parent = query()

    parent.promise = promise

    parent._prepareResult = function () {
        return this.promise
            .then(data => this.filter(data))
            .then(data => this.limit(data))
    }

    return parent
}

export default asyncQuery
