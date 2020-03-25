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
const { User } = require('./models/users')

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

// Add new user to the user database
app.post('/signup', (req, res) => {
	const user = new User ({
		username: req.body.username,
		password: req.body.password,
		rePassword: req.body.rePassword,
		avatar: req.body.avatar
	})
	const userExists = User.findOne({username: req.body.username})
	if (userExists) {
		return res.status(400).send("User already exists.")
	}

	else {
		user.save().then((user) => {
			res.send(user)
		}, (error) => {
			log("user save error")
			res.status(400).send(error)
		})
	}
})

// Route for getting all users
app.get('/signup', (req, res) => {
	User.find().then((user) => {
		res.send(user)
	}, (error) => {
		res.status(500).send(error)
	})
})

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	const userExists = User.findOne({username: req.body.username})

	if (!userExists) {
		return res.status(400).send("Invalid username.")
	}

	else if (userExists.password != password) {
		return res.status(400).send("Invalid password.")
	}
})

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
