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
    return leftRows.reduce((previous, leftRow) => {
        rightRows.forEach((rightRow) => {
            previous.push({
                ...leftRow,
                ...rightRow,
            })
        })

        return previous
    }, [])
}

export function innerJoin(leftRows, rightRows, onExpression) {
    return leftRows.reduce((previous, leftRow) => {
        rightRows.forEach((rightRow) => {
            if (onExpression.call(leftRow, rightRow)) {
                previous.push({
                    ...leftRow,
                    ...rightRow,
                })
            }
        })

        return previous
    }, [])
}

export function leftJoin(leftRows, rightRows, onExpression) {
    return leftRows.reduce((previous, leftRow) => {
        let hold = true

        rightRows.forEach((rightRow) => {
            if (onExpression.call(leftRow, rightRow)) {
                previous.push({
                    ...leftRow,
                    ...rightRow,
                })

                hold = false
            }
        })

        if (hold) {
            previous.push({
                ...leftRow,
            })
        }

        return previous
    }, [])
}

export function rightJoin(leftRows, rightRows, onExpression) {
    return rightRows.reduce((previous, rightRow) => {
        let hold = true

        leftRows.forEach((leftRow) => {
            if (onExpression.call(leftRow, rightRow)) {
                previous.push({
                    ...leftRow,
                    ...rightRow,
                })

                hold = false
            }
        })

        if (hold) {
            previous.push({
                ...rightRow,
            })
        }

        return previous
    }, [])
}
