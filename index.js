import where from './where.js'

function query(array) {
    return {
        _data: array,
        _filter: null,

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

function and(firstCallback) {
    return {
        with(secondCallback) {
            return (row) => firstCallback(row) && secondCallback(row)
        }
    }
}

function or(firstCallback) {
    return {
        with(secondCallback) {
            return (row) => firstCallback(row) || secondCallback(row)
        }
    }
}

export default query
