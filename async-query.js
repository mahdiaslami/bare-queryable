import query from './query.js'

function asyncQuery(promise) {
    const q = query()

    q._prepareResult = function () {
        return promise
            .then((data) => this._filter(data))
            .then((data) => this._orderBy(data))
            .then((data) => this._limit(data))
    }

    return q
}

export default asyncQuery
