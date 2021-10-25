const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    fullName:{
        type: 'string',
        require: true,
        min: 6,
        max: 100
    },
    email: {
        type: 'string',
        require: true,
        min: 6,
        max: 40,
        unique: true
    },
    password: {
        type: 'string',
        require: true,
        min: 8,
        max: 16
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users',UserSchema);