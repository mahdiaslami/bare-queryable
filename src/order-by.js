import makeGetterFunction from './helpers.js'

export default function orderBy(column, comparator, returnValue) {
    const getter = makeGetterFunction(column)

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
            return this.orderFactor * this._callback(getter(a), getter(b))
        },
    }
}
