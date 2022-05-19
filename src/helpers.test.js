import makeGetterFunction from './helpers.js'

const obj = {
    id: 1,
    two: {
        id: 1,
        three: {
            id: 1,
            four: {
                id: 1,
            },
        },
    },
}

test('get value of key in level one', () => {
    const getId = makeGetterFunction('id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level two', () => {
    const getId = makeGetterFunction('two.id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level three', () => {
    const getId = makeGetterFunction('two.three.id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level four', () => {
    const getId = makeGetterFunction('two.three.four.id')

    expect(getId(obj)).toEqual(1)
})
