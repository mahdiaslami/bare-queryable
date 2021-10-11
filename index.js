import where from './where.js'

function query(array, conditionFn = null) {
    return {
        _data: array,
        _filter: conditionFn,

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

        newInstance(conditionFn) {
            return query(this._data, conditionFn)
        },

        callConditionFn(row) {
            if (this._filter) {
                return this._filter(row)
            }

            return true
        },
    }
}

export default query
