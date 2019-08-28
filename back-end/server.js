const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 4000
const User = require('./models/User')
const Item = require('./models/Item')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})

mongoose.connect('mongodb://localhost/TakeMe', { useNewUrlParser: true })

app.get('/users', function (req, res) {
  User.find({}, function (err, result) {
    res.send(result)
  })
})

app.post('/chat', function (req, res) {
  const data = req.body

  const rMessgae = {
    status: "Recive",
    text: data.message,
    date: new Date(),
    seen: false
  }

  const sMessgae = {
    status: "Send",
    text: data.message,
    date: new Date(),
    seen: false
  }

  User.find({}, function (err, result) {
    const user = result.find(d => d.username === data.to)
    const chats = user.chats
    const chat = chats.find(c => c.to === data.from)

    const user2 = result.find(d => d.username === data.from)
    const chats2 = user2.chats
    const chat2 = chats2.find(c => c.to === data.to)

    if (chat === undefined) {
      const chatObj = {
        to: data.from,
        messages: []
      }
      chatObj.messages.push(rMessgae)
      chats.push(chatObj)
      User.findOneAndUpdate({ username: data.to }, { $set: { chats: chats } }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
      const chatObj2 = {
        to: data.to,
        messages: []
      }
      chatObj2.messages.push(sMessgae)
      chats2.push(chatObj2)
      User.findOneAndUpdate({ username: data.from }, { $set: { chats: chats2 } }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
      res.end()
    }

    else {
      chat.messages.push(rMessgae)
      chat2.messages.push(sMessgae)
      User.findOneAndUpdate({ username: data.to }, { $set: { chats: chats } }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
      User.findOneAndUpdate({ username: data.from }, { $set: { chats: chats2 } }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      });
      res.end()
    }
  })
})

app.post('/user', function (req, res) {
  const user = req.body
  const u = new User(user)
  u.save()
  res.end()
})

app.get('/items', function (req, res) {
  Item.find({}, function (err, result) {
    res.send(result)
  })
})

app.post('/item', function (req, res) {
  const item = req.body
  const i = new Item(item)
  i.save()
  res.end()
})

app.post('/message', function (req, res) {
  const message = req.body
  const m = new Message(message)
  m.save()
  res.end()
})


app.put('/user/:userid', function (req, res) {
  const userid = req.params.userid
  const update = req.body
  User.findOneAndUpdate({ "_id": userid }, update).then(function () {
  })
  res.end()
})



app.delete('/item/:itemId', function (req, res) {
  const id = req.params.itemId
  Item.findByIdAndDelete({ "_id": id }).then(function () {
  })
  res.end()
})


app.listen(port, function () {
  console.log("Server is up on port " + port)
})