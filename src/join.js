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

export function crossJoin(leftRows, rightRows) {
    return join(leftRows, rightRows).call()
}

export function innerJoin(leftRows, rightRows, onExpression) {
    return join(leftRows, rightRows).setOn(onExpression).call()
}

export function leftJoin(leftRows, rightRows, onExpression) {
    return join(leftRows, rightRows).setOn(onExpression).holdLeft().call()
}

export function rightJoin(leftRows, rightRows, onExpression) {
    return join(leftRows, rightRows).setOn(onExpression).holdRight().call()
}

const Side = {
    LEFT: 1,
    RIGHT: 2,
}

function join(leftRows, rightRows) {
    return {
        _nearRows: leftRows,
        _farRows: rightRows,
        _onExpression: trueOn(),
        _hold: false,

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
            const result = []

            this._nearRows.forEach((nearRow) => {
                let holded = nearRow

                this._farRows.forEach((farRow) => {
                    let leftRow = nearRow
                    let rightRow = farRow

                    if (this._hold === Side.RIGHT) {
                        leftRow = farRow
                        rightRow = nearRow
                    }

                    if (this._onExpression.call(leftRow, rightRow)) {
                        result.push({
                            ...leftRow,
                            ...rightRow,
                        })

                        holded = false
                    }
                })

                if (this._hold && holded) {
                    result.push({
                        ...holded,
                    })
                }
            })

            return result
        },
    }
}

function trueOn() {
    return {
        call() {
            return true
        },
    }
}
