import where from './where.js'
import orderBy from './order-by.js'
import { NUMBER_COMPARATOR } from './comparators.js'

function query(array) {
    return {
        _data: array,
        _joinCallback: null,
        _filterCallback: null,
        _limitCallback: null,
        _orderByCallback: null,

        get() {
            return this.call()
        },

        first() {
            this._limitCallback = (data) => data[0]

            return this.call()
        },

        last() {
            this._limitCallback = (data) => data[data.length - 1]

            return this.call()
        },

        count() {
            this._limitCallback = (data) => data.length

            return this.call()
        },

        call() {
            return this._prepareResult(this._data)
        },

        _prepareResult(data) {
            let result = this._join(data)

            result = this._filter(result)

            result = this._orderBy(result)

            return this._limit(result)
        },

        _join(data) {
            if (this._joinCallback) {
                return this._joinCallback(data)
            }

            return data
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

        crossJoin(rightData) {
            this._joinCallback = (leftData) => {
                const result = []

                leftData.forEach((leftRow) => {
                    rightData.forEach((rightRow) => {
                        result.push({
                            ...leftRow,
                            ...rightRow,
                        })
                    })
                })

                return result
            }

            return this
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
            const previousCallback = this._filterCallback

            this._filterCallback = (row) => previousCallback(row) && whereClause.call(row)
        },

        orWhere(column) {
            const whereClause = where(column, this)

            this._or(whereClause)

            return whereClause
        },

        _or(whereClause) {
            const previousCallback = this._filterCallback

            this._filterCallback = (row) => previousCallback(row) || whereClause.call(row)
        },

        orderBy(column, comparator = NUMBER_COMPARATOR) {
            const orderByExpression = orderBy(column, comparator, this)

            if (this._orderByCallback) {
                this._chainOrderByExpressions(orderByExpression)
            } else {
                this._orderByCallback = (a, b) => orderByExpression.call(a, b)
            }

            return orderByExpression
        },

        _chainOrderByExpressions(orderByExpression) {
            const previousCallback = this._orderByCallback

            this._orderByCallback = (a, b) => {
                const previousCallbackResult = previousCallback(a, b)

                if (previousCallbackResult === 0) {
                    return orderByExpression.call(a, b)
                }

                return previousCallbackResult
            }
        },
    }
}

export default query
