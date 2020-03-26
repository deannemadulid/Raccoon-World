/* server.js - user & resource authentication */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// for hashing
const bcrypt = require('bcryptjs')

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues
const { Chat } = require('./models/chatlog')
const { User } = require('./models/users')
const { OnlineUser } = require('./models/onlineUsers')

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
		avatar: req.body.avatar
	})
	User.findOne({username: req.body.username})
	.then((userExists) => {
		if (userExists) {
			res.status(400).send("User already exists.")
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(user.password, salt, (err, hash) => {
					user.password = hash
					user.save().then((result) => {
						res.send(result)
					}, (error) => {
						res.status(400).send(error)
					})
				})
			})
		}
	}, (error) => {
		res.status(500).send(error)
	})
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
	User.findOne({username: req.body.username})
	.then((user) => {
		if (!user) {
			res.status(400).send("Invalid username.")
		} else {
			bcrypt.compare(req.body.password, user.password).then((result) => {
				if (!result) {
					res.status(400).send("Invalid password.")
				} else {
					res.send(user)
				/*	if (req.body.admin === True) {
						res.redirect('/admin')
					} else {
						res.redirect('/user')
					}*/
				}
			})
		}
	}, (error) => {
		res.status(500).send(error)
	})
})

// Change user avatar
app.patch('/signup', (req, res) => {
	log('Colour change request')
	User.findOneAndUpdate({username: req.body.username},
		{$set: {'avatar': req.body.avatar}},)
	.then((user) => {
		if (!user) {
			res.status(400).send("Invalid username.")
		} else {
			res.send(user)
		}
	}, (error) => {
		res.status(500).send(error)
	})
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
		res.send({ chats })
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

//Add onlineUser check-in
app.post('/onlineUsers', (req, res) => {
	const onlineUser = new OnlineUser({
		time: req.body.time,
		username: req.body.username,
		avatar: req.body.avatar,
		room: req.body.room
	})

	onlineUser.save().then((onlineUser) => {
		res.send(onlineUser)
	}, (error) => {
		res.status(400).send(error)
	})
})

// Get all onlineUsers
app.get('/onlineUsers', (req, res) => {
	OnlineUser.find().then((onlineUsers) => {
		res.send({ onlineUsers })
	}, (error) => {
		res.status(500).send(error)
	})
})

/// a DELETE route to remove user's previous check-in
app.delete('/onlineUsers', (req, res) => {

	// Delete a student by their id
	OnlineUser.deleteOne({username: req.body.username}).then((onlineUser) => {
		res.send(onlineUser)
	}).catch((error) => {
		res.status(500).send() // server error, could not delete.
	})
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
