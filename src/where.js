import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    const getter = makeGetterFunction(column)

    return {
        equal(value) {
            this.callback = (a) => a === value

            return returnValue
        },

        notEqual(value) {
            this.callback = (a) => a !== value

            return returnValue
        },

        above(value) {
            this.callback = (a) => a > value

            return returnValue
        },

        aboveOrEqual(value) {
            this.callback = (a) => a >= value

            return returnValue
        },

        below(value) {
            this.callback = (a) => a < value

            return returnValue
        },

        belowOrEqual(value) {
            this.callback = (a) => a <= value

            return returnValue
        },

        contain(value) {
            this.callback = (a) => a.includes(value)

            return returnValue
        },

        in(array) {
            this.callback = (a) => array.includes(a)

            return returnValue
        },

        call(row) {
            return this.callback(getter(row))
        },
    }
}
