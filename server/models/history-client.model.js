const { model, Schema } = require('mongoose')

const clientShema = new Schema({
  status: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  change: {
    type: String,
    required: true
  },
  isActive: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  trades: {
    type: Array,
    default: []
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = model('historyClients', clientShema)
