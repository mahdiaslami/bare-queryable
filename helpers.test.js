import makeGetterFunction from './helpers.js'

test('get value of key in level one', () => {
    const obj = {
        id: 1,
    }

    const getId = makeGetterFunction('id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level two', () => {
    const obj = {
        prop: {
            id: 1,
        },
    }

    const getId = makeGetterFunction('prop.id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level three', () => {
    const obj = {
        prop: {
            prop: {
                id: 1,
            },
        },
    }

    const getId = makeGetterFunction('prop.prop.id')

    expect(getId(obj)).toEqual(1)
})

test('get value of key in level four', () => {
    const obj = {
        prop: {
            prop: {
                prop: {
                    id: 1,
                },
            },
        },
    }

    const getId = makeGetterFunction('prop.prop.prop.id')

    expect(getId(obj)).toEqual(1)
})
