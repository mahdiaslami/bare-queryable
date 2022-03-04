import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    const columnGetter = makeGetterFunction(column)

    return {
        _value: null,

        equal(value) {
            return this._prepare(
                value,
                (a, b) => a === b,
            )
        },

        notEqual(value) {
            return this._prepare(
                value,
                (a, b) => a !== b,
            )
        },

        above(value) {
            return this._prepare(
                value,
                (a, b) => a > b,
            )
        },

        aboveOrEqual(value) {
            return this._prepare(
                value,
                (a, b) => a >= b,
            )
        },

        below(value) {
            return this._prepare(
                value,
                (a, b) => a < b,
            )
        },

        belowOrEqual(value) {
            return this._prepare(
                value,
                (a, b) => a <= b,
            )
        },

        contain(value) {
            return this._prepare(
                value,
                (a, b) => a.includes(b),
            )
        },

        in(array) {
            return this._prepare(
                array,
                (a, b) => b.includes(a),
            )
        },

        _prepare(value, callback) {
            this._value = value

            this._callback = callback

            return returnValue
        },

        call(row) {
            return this._callback(columnGetter(row), this._value)
        },
    }
}
