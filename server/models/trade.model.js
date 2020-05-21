const { model, Schema } = require('mongoose')

const tradeShema = new Schema({
  client: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  pay: {
    type: Number,
    required: true
  },
  isNewTrade: {
    type: Boolean,
    default: false
  },
  clientId: {
    ref: 'clients',
    type: Schema.Types.ObjectId
  }
})

module.exports = model('trades', tradeShema)
