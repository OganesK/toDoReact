const express = require('express');
const json = express.json;
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./config/passport');

const URI = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/ToDoApp?retryWrites=true&w=majority";
const PORT = 3001;
const NODE_ENV = 'production'

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(json());
app.use(userRoute);
app.use(require('./routes'));

if(NODE_ENV === 'production'){
    console.log('Im in prod');
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
    })
}

app.listen(process.env.PORT || 3001, () => console.log(`Server is listening on: ${PORT}`));