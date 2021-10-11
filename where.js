
function where(column, query, chain) {
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

        _filter(callback) {
            query.setFilter(
                chain.with(callback)
            )

            return query
        },
    }
}

export default where