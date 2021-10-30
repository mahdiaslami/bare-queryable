export default function where(column, returnValue) {
    return {
        equal(value) {
            this.callback = (row) => row[column] === value

            return returnValue
        },

        above(value) {
            this.callback = (row) => row[column] > value

            return returnValue
        },

        aboveOrEqual(value) {
            this.callback = (row) => row[column] >= value

            return returnValue
        },

        below(value) {
            this.callback = (row) => row[column] < value

            return returnValue
        },

        belowOrEqual(value) {
            this.callback = (row) => row[column] <= value

            return returnValue
        },

        contain(value) {
            this.callback = (row) => row[column].includes(value)

            return returnValue
        },

        in(array) {
            this.callback = (row) => array.includes(row[column])

            return returnValue
        },

        call(row) {
            return this.callback(row)
        },
    }
}
