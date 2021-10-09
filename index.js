

function query(array, conditionFn = null) {
    return {
        _data: array,
        _conditionFn: conditionFn,

        get() {
            if (this._conditionFn) {
                return this._data.filter(this._conditionFn)
            }

            return this._data
        },

        first() {
            return this.get()[0]
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
            if (this._conditionFn) {
                return this._conditionFn(row)
            }

            return true
        },
    }
}

function where(query, column, or = false) {
    return {
        equal(value) {
            return this._filter((row) => row[column] == value)
        },

        above(value) {
            return this._filter((row) => row[column] > value)
        },

        below(value) {
            return this._filter((row) => row[column] < value)
        },

        contain(value) {
            return this._filter((row) => row[column].includes(value))
        },

        in(array) {
            return this._filter((row) => array.includes(row[column]))
        },

        _filter(conditionFn) {
            let newConditionFn = null

            if (or) {
                newConditionFn = (row) => query.callConditionFn(row) || conditionFn(row)
            } else {
                newConditionFn = (row) => query.callConditionFn(row) && conditionFn(row)
            }

            return query.newInstance(newConditionFn)
        },
    }
}

module.exports = query
