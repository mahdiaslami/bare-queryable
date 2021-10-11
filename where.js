
function where(query, column, chain) {
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
            query.setFilter(
                chain.with(conditionFn)
            )

            return query
        },
    }
}

export default where