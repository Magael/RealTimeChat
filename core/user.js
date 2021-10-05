const db = require('./db');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

//function User() {};

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: 'Username is required!'
    },
    email:{
        type: String,
        required: 'Email is required!'
    },
    password: {
        type: String,
        required: 'Password is required!'
    }
},{
    timestamp: true,
});
module.exports = mongoose.model('user', userSchema);
