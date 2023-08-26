const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username: {type:String, unique:true},
    password: String,
    isAdmin: Boolean,
}, {timestamps: true});

const UserModel = mongoose.model('User', userschema);
module.exports = UserModel;