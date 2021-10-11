import { where, and, or } from './condition.js'

function asyncQuery(promise) {
    return {
        promise: promise,
        _filter: null,

        get() {
            return this.do(data => data)
        },

        first() {
            return this.do(data => data[0])
        },

        last() {
            return this.do(data => data[data.length - 1])
        },

        do(callback) {
            return this.promise.then(this.filter()).then(callback)
        },

        filter() {
            if (this._filter) {
                return data => data.filter(this._filter)
            }

            return data => data
        },

        where(column) {
            return where(column, this, and(this.getFilter()))
        },

        orWhere(column) {
            return where(column, this, or(this.getFilter()))
        },

        setFilter(filter) {
            this._filter = filter
        },

        getFilter() {
            return this._filter ?? (() => true)
        }
    }
}

export default asyncQuery
