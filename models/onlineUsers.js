const mongoose = require('mongoose')

const onlineUserSchema = new mongoose.Schema({
    time: Date,
    username: String,
    avatar: String,
    room: Number
})

const OnlineUser = mongoose.model('OnlineUser', onlineUserSchema);

module.exports = { OnlineUser };
