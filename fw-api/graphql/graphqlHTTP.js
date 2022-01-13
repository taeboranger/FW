const graphqlHTTP = require('express-graphql').graphqlHTTP
const graphQLParams = require('express-graphql').getGraphQLParams
const buildSchema = require('graphql').buildSchema
const importSchema = require('graphql-import').importSchema
const resolver = require('./resolver.js')
const schema = buildSchema(importSchema('**/*.graphql'))

module.exports = api => api.use('/graphql', graphqlHTTP( (req, res, graphQLParams) => {
    return {
        schema: schema,
        rootValue: resolver,
        context: {req: req},
        graphiql: true
    }
}))