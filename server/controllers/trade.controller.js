const Trade = require('../models/trade.model')
const Client = require('../models/client.model')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }
  $set.isNewTrade = false

  const trade = new Trade($set)
  try {
    await trade.save()
    const client = await Client.findById($set.clientId)
    let message = 'Новая сделка успешно создана'
    client.trades.push(trade._id)

    if ($set.pay >= 100000) {
      client.status = 'vip'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список V.I.P. клиентов`
    } else if (client.status === 'aspirant' || (client.status === 'sleep' && client.trades.length < 3)) {
      client.status = 'open'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список открытых клиентов`
    } else if (client.trades.length >= 3 && (client.status === 'open' || client.status === 'sleep')) {
      client.status = 'repeat'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
    }

    client.date = Date.now()
    await client.save()
    await Client.findById($set.clientId).populate('trades').exec((error, client) => {
      res.status(201).json({ trade, client, message })
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.update = async (req, res) => {
  const $set = { ...req.body }
  try {
    const client = await Client.findById($set.clientId)
    let message = 'Информация о сделке успешно обновлена'

    if ($set.pay >= 100000) {
      client.status = 'vip'
      client.date = Date.now()
      message = `Информация о сделке успешно обновлена. Ваш клиент ${client.name} перенесен в список V.I.P. клиентов`
    }

    const trade = await Trade.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    await client.save()
    await Client.findById($set.clientId).populate('trades').exec((error, client) => {
      res.status(201).json({ trade, client, message })
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.remove = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientID)
    let message = 'Сделка успешно удалена'

    const tradeIndex = client.trades.indexOf(req.params.tradeID)
    client.trades.splice(tradeIndex, 1)
    await Trade.deleteOne({ _id: req.params.tradeID })

    const allTrades = await Trade.find({ clientId: req.params.clientID })
    const hasVIPtrade = allTrades.find(trade => trade.pay >= 100000)

    if (client.trades.length === 0) {
      client.status = 'aspirant'
      message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список новых клиентов`
    } else if (client.status === 'vip' && !hasVIPtrade) {
      if (client.trades.length >= 3) {
        client.status = 'repeat'
        message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
      } else {
        client.status = 'open'
        message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список открытых клиентов`
      }
    } else if (client.trades.length < 3 && client.status !== 'vip' && client.status !== 'sleep') {
      client.status = 'open'
      message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список открытых клиентов`
    }

    await client.save()
    await Client.findById(req.params.clientID).populate('trades').exec((error, client) => {
      res.status(201).json({ client, message })
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
