const express = require('express');
const json = express.json;
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const path = require('path');
require('./config/passport');
require('./config/config');

mongoose.connect(BASE_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
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

app.listen(process.env.PORT || PORT, () => console.log(`Server is listening on: ${PORT}`));