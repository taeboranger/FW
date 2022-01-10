const getItem = require('./controller').getItem

module.exports = resolver = {
    item: (args) => getItem(args),
    sheet: (args) => 20,
}

