const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');


const URI = "mongodb+srv://kostjaog:qwertyt123e5@cluster0.dp8zu.mongodb.net/ToDoApp?retryWrites=true&w=majority";
const PORT = 3001;


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
app.use(authRoute)
app.use(userRoute);

app.listen(PORT, () => console.log(`Server is listening on: ${PORT}`));