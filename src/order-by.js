export default function orderBy(column, comparator, returnValue) {
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
