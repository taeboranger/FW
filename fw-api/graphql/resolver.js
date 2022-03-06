const getItem = require('./controller').getItem
const getSheet = require('./controller').getSheet
const setSheet = require('./controller').setSheet

module.exports = resolver = {
    getItem: (args) => getItem(args),
    getSheet: (args, context) => getSheet(args, context),
    setSheet: (args, context) => setSheet(args, context)
}
