import where from './where.js'

function query(array) {
    return {
        _data: array,
        _filterCallback: null,
        _limitCallback: null,

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
            const result = this.filter(this._data)

            return this.limit(result)
        },

        filter(data) {
            if (this._filterCallback) {
                return data.filter(this._filterCallback)
            }

            return data
        },

        limit(data) {
            if (this._limitCallback) {
                return this._limitCallback(data)
            }

            return data
        },

        where(column) {
            const whereClause = where(column, this)

            this._filterCallback = (row) => whereClause.call(row)

            return whereClause
        },

        andWhere(column) {
            const whereClause = where(column, this)

            this.and(whereClause)

            return whereClause
        },

        and(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) && whereClause.call(row)
        },

        orWhere(column) {
            const whereClause = where(column, this)

            this.or(whereClause)

            return whereClause
        },

        or(whereClause) {
            const first = this._filterCallback

            this._filterCallback = (row) => first(row) || whereClause.call(row)
        },
    }
}

export default query
