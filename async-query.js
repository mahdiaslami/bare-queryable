import query from './query.js'

function asyncQuery(promise) {
    const parent = query()

    parent.promise = promise

    parent._prepareResult = function () {
        return this.promise
            .then(data => this._filter(data))
            .then(data => this._limit(data))
    }

    return parent
}

export default asyncQuery
