const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    rePassword: String,
    avatar: String
});

const User = mongoose.model('User', userSchema);

module.exports = { User };