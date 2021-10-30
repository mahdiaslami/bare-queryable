export const data = [
    {
        id: 0,
        name: 'aaaa',
        intval: 3,
        strval: 'd',
        dateval: '11/22/2021, 11:43:48 AM',
        strval2: 'b',
    },
    {
        id: 1,
        name: 'abaa',
        intval: 0,
        strval: 'a',
        dateval: '10/2/2021, 11:42:48 AM',
        strval2: 'a',
    },
    {
        id: 2,
        name: 'aaca',
        intval: 2,
        strval: 'c',
        dateval: '11/12/2021, 11:42:50 AM',
        strval2: 'b',
    },
    {
        id: 3,
        name: 'aaad',
        intval: 1,
        strval: 'b',
        dateval: '11/2/2021, 11:42:48 AM',
        strval2: 'a',
    },
]

export function factory(count) {
    const array = []

    for (let i = 1; i <= count; i++) {
        array.push({
            id: i,
            name: hash(),
        })
    }

    return array
}

export function now() {
    return (new Date()).getTime()
}

export function hash(length = 5) {
    return (Math.random() + 1).toString(36).substring(length)
}
