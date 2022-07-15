const emptyArray = (number) => {
    return Array.from(
        { length: number },
        () => ({ isEmpty: true })
    );
}

const fullArray = (arr, max) => {
    const len = arr.length
    let list = arr
    if (len != max) {
        var empty = emptyArray(max - len)
        list = arr.concat(empty)
    }
    return list
}

const shorten = (text, max) => {
    return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
}

const wordSplit = (str, index = 'all', firstLen = 29, defaultLen = 51) => {
    if (!str) return null
    let rows = []
    rows.push(shorten(str, firstLen))
    rows.push(shorten(str.slice(rows[0].length), defaultLen))
    rows.push(shorten(str.slice(rows[0].length + rows[1].length), defaultLen))
    rows.push(shorten(str.slice(rows[0].length + rows[1].length + rows[2].length), defaultLen))
    if (index === 'all')
        return rows
    else return rows[index]
}

module.exports = { fullArray, wordSplit }