import makeGetterFunction from './get-attribute.js'

test('get one level attribute', () => {
    const obj = {
        id: 1,
    }

    const getId = makeGetterFunction('id')

    expect(getId(obj)).toEqual(1)
})
