
export const NUMBER_COMPARATOR = (a, b) => a - b
export const STRING_COMPARATOR = (a, b) => a.localeCompare(b)
export const DATE_COMPARATOR = (a, b) => (new Date(a)).getTime() - (new Date(b).getTime())