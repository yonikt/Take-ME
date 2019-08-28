const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = new Schema({
    owned: String,
    title: String,
    category: String,
    condition: String,
    location: String,
    description: String,
    image: String,
    phone: String,
    name: String,
    date:Date
})

const Item = mongoose.model("Items", itemSchema)
module.exports = Item