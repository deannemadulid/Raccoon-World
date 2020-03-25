const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    time: Date,
    user: String,
    msg: String
})

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = { Chat };