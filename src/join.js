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
            this._nearAction = (near) => this._farLoop(this._farRows, near)
            this._farAction = (a, b) => this._result.push({ ...a, ...b })

            if (this._onExpression) {
                this._farAction = this._onWrapper(this._farAction)
            }

            if (this._outerSide === Side.RIGHT) {
                this._farAction = this._swapArgsWrapper(this._farAction)
            }

            if (this._outerSide !== Side.NONE) {
                this._nearAction = this._outerWrapper(this._nearAction)
            }
        },

        _nearLoop(rows) {
            for (let index = 0; index < rows.length; index++) {
                this._nearAction.call(this, rows[index])
            }
        },

        _outerWrapper(action) {
            return (near) => action(near) || this._result.push({ ...near })
        },

        _farLoop(rows, near) {
            let success = false

            for (let index = 0; index < rows.length; index++) {
                success = this._farAction.call(this, near, rows[index]) || success
            }

            return success
        },

        _swapArgsWrapper(action) {
            return (a, b) => action(b, a)
        },

        _onWrapper(action) {
            return (a, b) => this._onExpression.call(a, b) && action(a, b)
        },
    }
}
