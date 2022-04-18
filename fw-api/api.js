const express = require('express')
const api = express()
const cookieParser = require('cookie-parser')

const uuid = require('node-uuid')
const createNamespace = require('continuation-local-storage').createNamespace
const apiReq = createNamespace('api')

const sequelize = require('./models/index').sequelize;

const log = require('./components/logger.js').log
const err = require('./components/logger.js').err

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

api.use(cookieParser())
const configSession = require('./middlewares/session')
configSession(api)

api.use((req, res, next) => {
    apiReq.run(() => {
        apiReq.set('reqId', uuid.v1())
        next()
    })
})

const configPassport = require('./middlewares/passport')
configPassport(api)

const configGraphQL = require('./graphql/graphqlHTTP')
configGraphQL(api)

api.listen(PORT, () => {
    const driver = async () => {
        try {
            await sequelize.sync()
        } catch (e) {
            err(`sequelize error : ${e}`)
            return
        }

        log('sequelizer working')
    }
    driver()

    log(`Server running on Port ${PORT}`)
})

api.get('/', (req, res) => {
    try {
        res.send(req.user)
    }
    catch (e) {
        res.send("!")
    }
})

api.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})