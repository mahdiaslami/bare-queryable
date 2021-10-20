import where from './where.js'

export const NUMBER_COMPARATOR = (a, b) => a - b
export const STRING_COMPARATOR = (a, b) => a.localeCompare(b)
export const DATE_COMPARATOR = (a, b) => (new Date(a)).getTime() - (new Date(b).getTime())

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
                const previousCallback = this._orderByCallback

                this._orderByCallback = (a, b) => {
                    const previousCallbackResult = previousCallback(a, b)

                    if (previousCallbackResult == 0) {
                        return orderByExpression.call(a, b)
                    }

                    return previousCallbackResult
                }
            } else {
                this._orderByCallback = (a, b) => orderByExpression.call(a, b)
            }

            return orderByExpression
        }
    }
}

function orderBy(column, comparator, returnValue) {
    return {
        _callback: comparator,

        asc() {
            this.orderFactor = 1

            return returnValue
        },

        desc() {
            this.orderFactor = -1

            return returnValue
        },

        call(a, b) {
            return this.orderFactor * this._callback(a[column], b[column])
        },
    }
}

export default query
