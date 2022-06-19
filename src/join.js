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
    NONE: 0,
    LEFT: 1,
    RIGHT: 2,
}

export function join(leftRows, rightRows) {
    return {
        _onExpression: false,
        _outerSide: Side.NONE,

        _nearRows: leftRows,
        _farRows: rightRows,
        _nearAction: null,
        _farAction: null,
        _result: [],

        on(expression) {
            this._onExpression = expression

            return this
        },

        leftOuter() {
            this._outerSide = Side.LEFT

            return this
        },

        rightOuter() {
            this._outerSide = Side.RIGHT

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
            this._nearAction = (nearRow) => this._farLoop(this._farRows, nearRow)
            this._farAction = this._join

            if (this._onExpression) {
                this._farAction = this._joinOn
            }

            if (this._outerSide === Side.RIGHT) {
                this._farAction = this._JoinOnWithSwappedArgs
            }

            if (this._outerSide !== Side.NONE) {
                this._nearAction = this._outer(this._nearAction)
            }
        },

        _nearLoop(rows) {
            for (let index = 0; index < rows.length; index++) {
                this._nearAction.call(this, rows[index])
            }
        },

        _outer(action) {
            return (nearRow) => action(nearRow) || this._push({ ...nearRow })
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
