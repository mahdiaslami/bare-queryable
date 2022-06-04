import makeGetterFunction from './helpers.js'

export default function where(column, returnValue) {
    return {
        _callback: null,
        _columnGetter: makeGetterFunction(column),
        _returnValue: returnValue,
        _compareTwoColumns: false,

        get col() {
            this._compareTwoColumns = true

            return this
        },

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
            if (this._compareTwoColumns) {
                this._valueGetter = makeGetterFunction(value)
            } else {
                this._valueGetter = () => value
            }

            this._callback = callback

            return this._returnValue
        },

        call(firstRow, secondRow = firstRow) {
            return this._callback(
                this._columnGetter(firstRow),
                this._valueGetter(secondRow),
            )
        },
    }
}
