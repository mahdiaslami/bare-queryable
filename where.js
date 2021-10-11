
function where(query, column, or = false) {
    return {
        equal(value) {
            return this._filter((row) => row[column] == value)
        },

        above(value) {
            return this._filter((row) => row[column] > value)
        },

        aboveOrEqual(value) {
            return this._filter((row) => row[column] >= value)
        },

        below(value) {
            return this._filter((row) => row[column] < value)
        },

        belowOrEqual(value) {
            return this._filter((row) => row[column] <= value)
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
                newConditionFn = (row) => query.callFilter(row) || conditionFn(row)
            } else {
                newConditionFn = (row) => query.callFilter(row) && conditionFn(row)
            }

            return query.newInstance(newConditionFn)
        },
    }
}

export default where