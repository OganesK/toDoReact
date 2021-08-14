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
            },
            group:{
                type: String
            }
        }
    ],
    groups: [{type:String}]
})

module.exports = mongoose.model('User', userSchema);