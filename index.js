import where from './where.js'

function query(array, filter = null) {
    return {
        _data: array,
        _filter: filter,

        get() {
            if (this._filter) {
                return this._data.filter(this._filter)
            }

            return this._data
        },

        first() {
            return this.get()[0]
        },

        last() {
            return this.get()[this._data.length - 1]
        },

        where(column) {
            return where(this, column)
        },

        orWhere(column) {
            return where(this, column, true)
        },

        newInstance(filter) {
            return query(this._data, filter)
        },

        callFilter(row) {
            if (this._filter) {
                return this._filter(row)
            }

            return true
        },
    }
}

export default query
