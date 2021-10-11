import query from './async-query'

const data = [
    {
        id: 0,
        name: 'aaaa'
    },
    {
        id: 1,
        name: 'abaa'
    },
    {
        id: 2,
        name: 'aaca'
    },
    {
        id: 3,
        name: 'aaad'
    }
]

const promise = new Promise((resolve) => resolve(data))

test('get all data', () => {
    expect.assertions(1)

    query(promise).get().then(result => {
        expect(result).toEqual(data)
    })

})

test('get first item', () => {
    expect.assertions(1)

    query(promise).first().then(result => {
        expect(result).toEqual(data[0])
    })
})

test('get last item', () => {
    expect.assertions(1)

    query(promise).last().then(result => {
        expect(result).toEqual(data[3])
    })
})

test('where equal', () => {
    expect.assertions(1)

    query(promise)
        .where('id').equal(2)
        .get().then(result => {
            expect(result).toEqual([data[2]]);
        })
})

test('where above', () => {
    expect.assertions(1)

    query(promise)
        .where('id').above(2)
        .get().then(result => {
            expect(result).toEqual([data[3]])
        })
})

test('where above or equal', () => {
    expect.assertions(1)

    query(promise)
        .where('id').aboveOrEqual(2)
        .get().then(result => {
            expect(result).toEqual([data[2], data[3]])
        })
})

test('where below', () => {
    expect.assertions(1)

    query(promise)
        .where('id').below(2)
        .get().then(result => {
            expect(result).toEqual([data[0], data[1]])
        })
})

test('where below or equal', () => {
    expect.assertions(1)

    query(promise)
        .where('id').belowOrEqual(1)
        .get().then(result => {
            expect(result).toEqual([data[0], data[1]])
        })
})

test('where in', () => {
    expect.assertions(1)

    query(promise)
        .where('id').in([1, 3])
        .get().then(result => {
            expect(result).toEqual([data[1], data[3]])
        })
})

test('where contain', () => {
    expect.assertions(1)

    query(promise)
        .where('name').contain('b')
        .get().then(result => {
            expect(result).toEqual([data[1]])
        })
})

test('and two conditions', () => {
    expect.assertions(1)

    query(promise)
        .where('id').equal(1)
        .where('id').above(2)
        .get().then(result => {
            expect(result).toEqual([])
        })
})

test('or two conditions', () => {
    expect.assertions(1)

    query(promise)
        .where('id').equal(1)
        .orWhere('id').above(2)
        .get().then(result => {
            expect(result).toEqual([data[1], data[3]])
        })
})

test('prevent duplicate item that staisfy two or conditions', () => {
    expect.assertions(1)

    query(promise)
        .where('id').above(1)
        .orWhere('id').equal(2)
        .get().then(result => {
            expect(result).toEqual([data[2], data[3]])
        })
})

test('query on 10000 obj be less than 50ms', () => {
    expect.assertions(1)

    const array = factory(10000)
    const promise = new Promise((resolve) => resolve(array))

    const start = now()
    query(promise)
        .where('id').above(50)
        .where('id').below(9950)
        .orWhere('id').in([2, 3, 5, 7])
        .where('name').contain(6)
        .get().then(() => {
            const end = now()

            expect(end - start).toBeLessThan(50)
        })
})

function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash()
        })
    }

    return array
}

function now() {
    return (new Date).getTime()
}

function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}