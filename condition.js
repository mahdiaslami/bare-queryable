
export function where(column, query) {
    return {
        equal(value) {
            this.callback = (row) => row[column] == value

            return this._filter()
        },

        above(value) {
            this.callback = (row) => row[column] > value

            return this._filter()
        },

        aboveOrEqual(value) {
            this.callback = (row) => row[column] >= value

            return this._filter()
        },

        below(value) {
            this.callback = (row) => row[column] < value

            return this._filter()
        },

        belowOrEqual(value) {
            this.callback = (row) => row[column] <= value

            return this._filter()
        },

        contain(value) {
            this.callback = (row) => row[column].includes(value)

            return this._filter()
        },

        in(array) {
            this.callback = (row) => array.includes(row[column])

            return this._filter()
        },

        _filter() {
            return query
        },

        call(row) {
            return this.callback(row)
        },
    }
}


export function and(firstCallback) {
    return {
        with(secondCallback) {
            return (row) => firstCallback(row) && secondCallback.call(row)
        }
    }
}

export function or(firstCallback) {
    return {
        with(secondCallback) {
            return (row) => firstCallback(row) || secondCallback.call(row)
        }
    }
}
