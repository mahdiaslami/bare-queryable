
export const data = [
    {
        id: 0,
        name: 'aaaa',
        intval: 3,
        strval: 'd',
    },
    {
        id: 1,
        name: 'abaa',
        intval: 0,
        strval: 'a',
    },
    {
        id: 2,
        name: 'aaca',
        intval: 2,
        strval: 'c',
    },
    {
        id: 3,
        name: 'aaad',
        intval: 1,
        strval: 'b',
    }
]

export function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash()
        })
    }

    return array
}

export function now() {
    return (new Date).getTime()
}

export function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}