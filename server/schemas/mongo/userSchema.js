const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    todoList: [{
        type: String,
        required: false
    }]
})

module.exports = mongoose.model('User', userSchema);