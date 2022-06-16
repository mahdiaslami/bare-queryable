import where from './where.js'

export function on(returnValue) {
    return {
        _whereExpression: null,

        on(column) {
            this._whereExpression = where(column, returnValue)

            return this._whereExpression
        },

        call(leftRow, rightRow) {
            return this._whereExpression.call(leftRow, rightRow)
        },
    }
}

const Side = {
    LEFT: 1,
    RIGHT: 2,
}

export function join(leftRows, rightRows) {
    return {
        _nearRows: leftRows,
        _farRows: rightRows,
        _onExpression: false,
        _hold: false,
        _result: [],

        setOn(expression) {
            this._onExpression = expression

            return this
        },

        holdLeft() {
            this._hold = Side.LEFT

            return this
        },

        holdRight() {
            this._hold = Side.RIGHT

            const temp = this._nearRows
            this._nearRows = this._farRows
            this._farRows = temp

            return this
        },

        call() {
            this._result = []
            let next

            if (this._onExpression === false) {
                next = this._join
            } else if (this._hold === Side.RIGHT) {
                next = this._JoinOnWithSwappedArgs
            } else {
                next = this._joinOn
            }

            let callback = this._nearRowsCallback

            if (this._hold) {
                callback = this._holdCallback
            }

            this._foreach(this._nearRows, callback, [next])

            return this._result
        },

        _holdCallback(callback, nearRow) {
            if (this._nearRowsCallback(callback, nearRow) === false) {
                this._push({ ...nearRow })
            }
        },

        _nearRowsCallback(callback, nearRow) {
            return this._foreach(this._farRows, callback, [nearRow])
        },

        _foreach(rows, callback, args = []) {
            let success = false

            for (let index = 0; index < rows.length; index++) {
                success = callback.call(this, ...args, rows[index]) || success
            }

            return success
        },

        _JoinOnWithSwappedArgs(b, a) {
            return this._joinOn(a, b)
        },

        _joinOn(a, b) {
            return this._onExpression.call(a, b)
                && this._join(a, b)
        },

        _join(a, b) {
            return this._push(this._merge(a, b))
        },

        _push(a) {
            return this._result.push(a)
        },

        _merge(a, b) {
            return { ...a, ...b }
        },
    }
}
