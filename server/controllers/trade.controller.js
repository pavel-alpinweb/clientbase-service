const Trade = require('../models/trade.model')
const Client = require('../models/client.model')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }
  $set.isNewTrade = false

  const trade = new Trade($set)
  try {
    await trade.save()
    const client = await Client.findById($set.client.id)
    let message = 'Новая сделка успешно создана'

    if ($set.pay >= 100000) {
      client.status = 'vip'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список V.I.P. клиентов`
    } else if (client.status === 'aspirant') {
      client.status = 'open'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список открытых клиентов`
    } else if (client.trades.length === 2 && client.status === 'open') {
      client.status = 'repeat'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
    }

    client.trades.push(trade._id)
    client.date = Date.now()
    await client.save()
    res.status(201).json({ trade, client, message })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.update = async (req, res) => {
  const $set = { ...req.body }
  try {
    const trade = await Trade.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    res.status(201).json(trade)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Trade.deleteOne({ _id: req.params.id })
    res.status(201).json({ message: 'Сделка успешно удалена' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
