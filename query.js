import { where, and, or } from './condition.js'

function query(array) {
    return {
        _data: array,
        _filterCallback: null,

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
            return callback(
                this.filter()(this._data)
            )
        },

        filter() {
            if (this._filterCallback) {
                return data => data.filter(this._filterCallback)
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
            this._filterCallback = filter
        },

        getFilter() {
            return this._filterCallback ?? (() => true)
        }
    }
}

export default query
