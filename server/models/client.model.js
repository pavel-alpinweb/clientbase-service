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
  trades: [
    {
      type: Schema.Types.ObjectId,
      ref: 'trades'
    }
  ],
  userId: {
    type: String,
    required: true
  }
})

module.exports = model('clients', clientShema)
