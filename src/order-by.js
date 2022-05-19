import makeGetterFunction from './helpers.js'

export default function orderBy(column, comparator, returnValue) {
    const getter = makeGetterFunction(column)

    return {
        _callback: comparator,
        _orderFactor: 1,

        asc() {
            this._orderFactor = 1

            return returnValue
        },

        desc() {
            this._orderFactor = -1

            return returnValue
        },

        call(a, b) {
            return this._orderFactor * this._callback(getter(a), getter(b))
        },
    }
}
