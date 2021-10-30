import query from './query.js'

function asyncQuery(promise) {
    const q = query()

    q.call = function asyncCall() {
        return promise
            .then((data) => this._prepareResult(data))
    }

    return q
}

export default asyncQuery
