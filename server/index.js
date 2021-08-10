const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas/graphql/schema')
const mongoDb = require('mongodb');

const PORT = 3001;
// const URI = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new mongoDb.MongoClient(URI);
const users = [
    {
        id:1,
        username: 'Tom',
        age: 20
    }
];

const createUser = (input) => {
    const id = Date.now();
    return {
        id, ...input
    }
}

const root = {
    getAllUsers: () => {
        return users;
    },
    getUser: ({id}) => {
        return users.filter(user => user.id === id)
    },
    createUser: ({input}) => {
        const user = createUser(input);
        users.push(user);
        return user;
    }
}

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));