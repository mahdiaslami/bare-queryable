
const greet = require('./index.js')

test('it return \'Hello, World!\'', () => {
    expect(greet()).toBe('Hello, World!')
})