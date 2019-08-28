const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    name: String,
    password: String,
    phone: String,
    favorites: Array,
    userimage:String,
    chats: Array
})

const User = mongoose.model("Users", userSchema)
module.exports = User