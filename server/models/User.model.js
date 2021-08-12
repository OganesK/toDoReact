const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    todoList: [
        {
            id: {
                type: String
            },
            name: {
                type: String
            },
            completed: {
                type: Boolean
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema);