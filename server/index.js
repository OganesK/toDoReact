const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schemas/graphql/schema')
const mongoose = require('mongoose');
const User = require('./schemas/mongo/userSchema.js');
const userRoute = require('./routes/user.route');
const getToDo = require('./routes/getToDo.route');
const newTask = require('./routes/newTask.route');

const URI = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/ToDoApp?retryWrites=true&w=majority";
const PORT = 3001;


mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();
app.use(cors());
app.use(getToDo);
app.use(newTask);
app.use(userRoute);

app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));