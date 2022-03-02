import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    const getter = makeGetterFunction(column)

    return {
        equal(value) {
            this.callback = (row) => getter(row) === value

            return returnValue
        },

        notEqual(value) {
            this.callback = (row) => getter(row) !== value

            return returnValue
        },

        above(value) {
            this.callback = (row) => getter(row) > value

            return returnValue
        },

        aboveOrEqual(value) {
            this.callback = (row) => getter(row) >= value

            return returnValue
        },

        below(value) {
            this.callback = (row) => getter(row) < value

            return returnValue
        },

        belowOrEqual(value) {
            this.callback = (row) => getter(row) <= value

            return returnValue
        },

        contain(value) {
            this.callback = (row) => getter(row).includes(value)

            return returnValue
        },

        in(array) {
            this.callback = (row) => array.includes(getter(row))

            return returnValue
        },

        call(row) {
            return this.callback(row)
        },
    }
}
