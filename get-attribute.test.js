import makeGetterFunction from './get-attribute.js'

test('get value of key in level one', () => {
    const obj = {
        id: 1,
    }

    const getId = makeGetterFunction('id')

    expect(getId(obj)).toEqual(1)
})
