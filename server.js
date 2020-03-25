/* server.js - user & resource authentication */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues
const { Chat } = require('./models/chatlog')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')))
app.use("/js", express.static(path.join(__dirname, '/public/js')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'))
})

/*** Session handling **************************************/

// Add new chat to the chatlog database
app.post('/chatlog', (req, res) => {
	const chat = new Chat({
		time: req.body.time,
		user: req.body.user,
		msg: req.body.msg
	})
	log('logging chat')

	chat.save().then((chat) => {
		res.send(chat)
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get all chats from chatlog
app.get('/chatlog', (req, res) => {
	Chat.find()
	.then((chats) => {
		res.send(chats)
	}, (error) => {
		res.status(500).send(error)
	})
})

// Purge chatlog
app.delete('/chatlog', (req, res) => {
	Chat.deleteMany()
	.then((chats) => {
		res.send(chats)
	}, (error) => {
		res.status(500).send(error)
	})

})



/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 