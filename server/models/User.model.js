const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
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
            },
            state:{
                type: String
            }
        }
    ],
    groups: [{type:String}]
})

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'SHA512').toString('hex');
};

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'SHA512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expireationDate = new Date(today);
    expireationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expireationDate.getTime() /1000, 10),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('User', userSchema);