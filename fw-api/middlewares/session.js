const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const options = require('../configs/config.json').dev_session_store
const session_store = new MySQLStore(options)
const session_config = require('../configs/config.json').dev_session_config

module.exports = api => api.use(session(
    Object.assign({
        "secret": process.env['SESSION_SECRET'],
        "store": session_store,
    }, session_config)
))