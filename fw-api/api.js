const express = require('express')
const api = express()

const uuid = require('node-uuid')
const createNamespace = require('continuation-local-storage').createNamespace
const apiReq = createNamespace('api')

const sequelize = require('./models/index').sequelize;

const log = require('./components/logger.js').log
const err = require('./components/logger.js').err

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

const configSession = require('./configs/session')
configSession(api)

api.use((req, res, next) => {
    apiReq.run( () => {
        apiReq.set('reqId', uuid.v1())
        next()
    })
})

const configPassport = require('./configs/passport')
configPassport(api)

const configGraphQL = require('./graphql/graphqlHTTP')
configGraphQL(api)

api.listen(PORT,"0.0.0.0",()=>{
    const driver = async () => {
        try {
            await sequelize.sync()
        } catch (e) {
            err(`sequelize error : ${e}`)
            return
        }
     
        log('sequelizer working')
    }
    driver(); // sequelize syncedr
    
    log(`Server running on Port ${PORT}`)
})

api.get('/', (req,res) => {
    console.log(req.user.id)
    res.send(req.user.id)
})