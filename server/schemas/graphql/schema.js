const {buildSchema} = require('graphql')

const schema = buildSchema(`
    type User {
        id: ID
        posts: [String]
    }
    type Mutation {
        createUser: ID
    }
`)

module.exports = schema