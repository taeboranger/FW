module.exports = resolver = {
    item: (_, {index}) => {
        return JSON.parse('{"name" : "hi"}')
    },
    sheet: (_, {index}) => 20,
}

