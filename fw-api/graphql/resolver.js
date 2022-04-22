const getItem = require('./controller').getItem
const getSheet = require('./controller').getSheet
const setSheet = require('./controller').setSheet
const updSheet = require('./controller').updSheet
const getUser = require('./controller').getUser

module.exports = resolver = {
    getItem: (args) => getItem(args),
    getSheet: (args, context) => getSheet(args, context),
    setSheet: (args, context) => setSheet(args, context),
    updSheet: (args, context) => updSheet(args, context),
    getUser: (args, context) => getUser(args, context)
}
