import where from './where.js'

function query(array) {
    return {
        _data: array,
        _filterCallback: null,

        get() {
            return this.do(data => data)
        },

        first() {
            return this.do(data => data[0])
        },

        last() {
            return this.do(data => data[data.length - 1])
        },

        do(callback) {
            return callback(
                this.filter()(this._data)
            )
        },

        filter() {
            if (this._filterCallback) {
                return data => data.filter(this._filterCallback)
            }

            return data => data
        },

        where(column) {
            const whereClause = where(column, this)

            this.setFilter(
                this.and(whereClause)
            )

            return whereClause
        },

        and(second) {
            const first = this.getFilter()

            return (row) => first(row) && second.call(row)
        },

        orWhere(column) {
            const whereClause = where(column, this)

            this.setFilter(
                this.or(whereClause)
            )

            return whereClause
        },

        or(second) {
            const first = this.getFilter()

            return (row) => first(row) || second.call(row)
        },

        setFilter(filter) {
            this._filterCallback = filter
        },

        getFilter() {
            return this._filterCallback ?? (() => true)
        }
    }
}

export default query
