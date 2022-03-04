import where from './where.js'
import {
    users, parents,
} from './fake.js'

export default function join(returnValue) {
    return {
        _whereExpression: null,

        on(column) {
            this._whereExpression = where(column, returnValue)

            return this._whereExpression
        },

        call() {
            return [
                { ...users[0], ...parents[0] },
                { ...users[1], ...parents[0] },
                { ...users[2], ...parents[1] },
            ]
        },
    }
}
