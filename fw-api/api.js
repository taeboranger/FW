const express = require('express')
const graphqlHTTP = require('express-graphql').graphqlHTTP
const buildSchema = require('graphql').buildSchema
const importSchema = require('graphql-import').importSchema
const api = express()

const sequelize = require('./models/index').sequelize;
const log = require('./components/logger.js').log
const err = require('./components/logger.js').err

const resolver = require('./grpahql/resolver.js')
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