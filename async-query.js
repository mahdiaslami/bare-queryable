import query from './query.js'

function asyncQuery(promise) {
    const q = query()

    q.promise = promise

    q._prepareResult = function () {
        return this.promise
            .then(data => this._filter(data))
            .then(data => this._limit(data))
    }

    return q
}

export default asyncQuery
