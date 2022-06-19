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
        _onExpression: false,
        _hold: false,

        _nearRows: leftRows,
        _farRows: rightRows,
        _nearAction: null,
        _farAction: null,
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

            this._planning()

            this._nearLoop(this._nearRows)

            return this._result
        },

        _planning() {
            this._nearAction = this._noneAction
            this._farAction = this._join

            if (this._onExpression) {
                this._farAction = this._joinOn
            }

            if (this._hold === Side.RIGHT) {
                this._farAction = this._JoinOnWithSwappedArgs
            }

            if (this._hold) {
                this._nearAction = this._holdAction
            }
        },

        _nearLoop(rows) {
            for (let index = 0; index < rows.length; index++) {
                this._nearAction.call(this, rows[index])
            }
        },

        _holdAction(nearRow) {
            if (this._noneAction(nearRow) === false) {
                this._push({ ...nearRow })
            }
        },

        _noneAction(nearRow) {
            return this._farLoop(this._farRows, nearRow)
        },

        _farLoop(rows, nearRow) {
            let success = false

            for (let index = 0; index < rows.length; index++) {
                success = this._farAction.call(this, nearRow, rows[index]) || success
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
