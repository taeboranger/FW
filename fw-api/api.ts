import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import { buildSchema } from 'graphql';
import {importSchema} from 'graphql-import';
const api = express()

const sequelize = require('./models/index').sequelize;
const log = require('./components/logger.js').log
const err = require('./components/logger.js').err

import {resolver} from './grpahql/resolver'
const schema = buildSchema(importSchema('**/*.graphql'))


api.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
}))

api.listen(3000,"0.0.0.0",()=>{
    const driver = async () => {
        try {
            await sequelize.sync()
        } catch (e) {
            err('sequelize error : ' + e)
            return
        }
     
        log('sequelizer working')
    }
    driver(); // sequelize syncedr
    
    log("Server running on Port " + 3000)
})