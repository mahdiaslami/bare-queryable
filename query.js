import where from './where.js'

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

        orderBy(column, type = null) {
            this._orderByCallback = (a, b) => {
                const valueOfA = a[column]
                const valueOfB = b[column]

                if (type === 'date') {
                    return (new Date(valueOfA)).getTime() - (new Date(valueOfB).getTime())
                } else if (typeof valueOfA === 'string' || valueOfA instanceof String) {
                    return valueOfA.localeCompare(valueOfB)
                }

                return valueOfA - valueOfB
            }

            return this
        }
    }
}

export default query
