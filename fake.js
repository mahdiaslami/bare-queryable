
export const data = [
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