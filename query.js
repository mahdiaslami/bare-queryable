import { factory } from './fake.js'
import where from './where.js'

export const NUMBER_TYPE = 1
export const STRING_TYPE = 2
export const DATE_TYPE = 3

function query(array) {
    return {
        _data: array,
        _filterCallback: null,
        _limitCallback: null,
        _orderByCallback: null,

        get() {
            return this._prepareResult()
        },

        first() {
            this._limitCallback = data => data[0]

            return this._prepareResult()
        },

        last() {
            this._limitCallback = data => data[data.length - 1]

            return this._prepareResult()
        },

        _prepareResult() {
            let result = this._filter(this._data)

            result = this._orderBy(result)

            return this._limit(result)
        },

        _filter(data) {
            if (this._filterCallback) {
                return data.filter(this._filterCallback)
            }

            return data
        },

        _orderBy(data) {
            if (this._orderByCallback) {
                return data.slice(0).sort(this._orderByCallback)
            }

            return data
        },

        _limit(data) {
            if (this._limitCallback) {
                return this._limitCallback(data)
            }

            return data
        },

        where(column) {
            const whereClause = where(column, this)

            if (this._filterCallback) {
                this._and(whereClause)
            } else {
                this._filterCallback = (row) => whereClause.call(row)
            }

            return whereClause
        },

        andWhere(column) {
            const whereClause = where(column, this)

            this._and(whereClause)

            return whereClause
        },

        _and(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) && whereClause.call(row)
        },

        orWhere(column) {
            const whereClause = where(column, this)

            this._or(whereClause)

            return whereClause
        },

        _or(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) || whereClause.call(row)
        },

        orderBy(column, type = NUMBER_TYPE) {
            const orderByExpression = orderBy(column, type, this)

            this._orderByCallback = (a, b) => orderByExpression.call(a, b)

            return orderByExpression
        }
    }
}

function orderBy(column, type, returnValue) {
    return {
        asc() {
            this.orderFactor = 1

            return returnValue
        },

        desc() {
            this.orderFactor = -1

            return returnValue
        },

        call(a, b) {
            const valueOfA = a[column]
            const valueOfB = b[column]

            let result = 0

            switch (type) {
                case NUMBER_TYPE:
                    result = valueOfA - valueOfB
                    break;
                case STRING_TYPE:
                    result = valueOfA.localeCompare(valueOfB)
                    break;
                case DATE_TYPE:
                    result = (new Date(valueOfA)).getTime() - (new Date(valueOfB).getTime())
                    break;
            }

            return this.orderFactor * result
        },
    }
}

export default query
