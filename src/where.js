import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    const getter = makeGetterFunction(column)

    return {
        equal(value) {
            this._callback = (a) => a === value

            return returnValue
        },

        notEqual(value) {
            this._callback = (a) => a !== value

            return returnValue
        },

        above(value) {
            this._callback = (a) => a > value

            return returnValue
        },

        aboveOrEqual(value) {
            this._callback = (a) => a >= value

            return returnValue
        },

        below(value) {
            this._callback = (a) => a < value

            return returnValue
        },

        belowOrEqual(value) {
            this._callback = (a) => a <= value

            return returnValue
        },

        contain(value) {
            this._callback = (a) => a.includes(value)

            return returnValue
        },

        in(array) {
            this._callback = (a) => array.includes(a)

            return returnValue
        },

        call(row) {
            return this._callback(getter(row))
        },
    }
}
