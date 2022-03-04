import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    return {
        _value: null,
        _callback: null,
        _columnGetter: makeGetterFunction(column),
        _returnValue: returnValue,

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

            return this._returnValue
        },

        call(row) {
            return this._callback(
                this._columnGetter(row),
                this._value,
            )
        },
    }
}
