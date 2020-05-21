const Trade = require('../models/trade.model')
const Client = require('../models/client.model')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }
  $set.isNewTrade = false

  const trade = new Trade($set)
  try {
    await trade.save()
    const client = await Client.findById($set.client.id)
    client.trades.push(trade._id)
    await client.save()
    res.status(201).json(trade)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
