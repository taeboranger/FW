const getItem = require('./controller').getItem
const getSheet = require('./controller').getSheet
const setSheet = require('./controller').setSheet

module.exports = resolver = {
    getItem: (args) => getItem(args),
    getSheet: (args) => getSheet(args),
    setSheet: (args, context) => setSheet(args, context)
}

