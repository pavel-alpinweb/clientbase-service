const Trade = require('../models/trade.model')
const Client = require('../models/client.model')
const HistoryClient = require('../models/history-client.model')
const historyFn = require('../modules/historyFn')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }
  $set.isNewTrade = false

  const trade = new Trade($set)
  let isChangeStatus = false
  let historyMessage = ''
  try {
    await trade.save()
    await Client.findById($set.clientId).populate('trades').exec(async (error, client) => {
      const lastChangedTrade = {
        type: 'plus',
        trade
      }
      await historyFn.saveClientInHistory(client, HistoryClient, 'Добавлена сделка', lastChangedTrade)
      if (error) {
        res.status(500).json(error)
      }
    })

    const client = await Client.findById($set.clientId)
    let message = 'Новая сделка успешно создана'
    client.trades.push(trade._id)

    if ($set.pay >= 100000 && client.status !== 'vip') {
      client.status = 'vip'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список V.I.P. клиентов`
      isChangeStatus = true
      historyMessage = 'Смена статуса на "V.I.P."'
    } else if (client.status === 'aspirant' || (client.status === 'sleep' && client.trades.length < 3)) {
      client.status = 'open'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список открытых клиентов`
      isChangeStatus = true
      historyMessage = 'Смена статуса на "Открытый"'
    } else if (client.trades.length >= 3 && (client.status === 'open' || client.status === 'sleep')) {
      client.status = 'repeat'
      message = `Новая сделка успешно создана. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
      isChangeStatus = true
      historyMessage = 'Смена статуса на "Постоянный"'
    }

    client.date = Date.now()
    await client.save()
    await Client.findById($set.clientId).populate('trades').exec(async (error, client) => {
      if (isChangeStatus) {
        await historyFn.saveClientInHistory(client, HistoryClient, historyMessage)
      }
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
  let isChangeStatus = false
  let historyMessage = ''
  try {
    await Client.findById($set.clientId).populate('trades').exec(async (error, client1) => {
      const lastChangedTrade = {
        type: 'edit',
        trade: $set
      }
      await historyFn.saveClientInHistory(client1, HistoryClient, 'Сделка обнолена', lastChangedTrade)
      if (error) {
        res.status(500).json(error)
      }
    })
    const trade = await Trade.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    const client = await Client.findById($set.clientId)
    let message = 'Информация о сделке успешно обновлена'

    const allTrades = await Trade.find({ clientId: $set.clientId })
    const hasVIPtrade = allTrades.find(trade => trade.pay >= 100000)

    if ($set.pay >= 100000 && client.status !== 'vip') {
      client.status = 'vip'
      client.date = Date.now()
      message = `Информация о сделке успешно обновлена. Ваш клиент ${client.name} перенесен в список V.I.P. клиентов`
      isChangeStatus = true
      historyMessage = 'Смена статуса на "V.I.P."'
    } else if (client.status === 'vip' && !hasVIPtrade) {
      if (client.trades.length >= 3) {
        client.status = 'repeat'
        message = `Информация о сделке успешно обновлена. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
        isChangeStatus = true
        historyMessage = 'Смена статуса на "Постоянный"'
      } else {
        client.status = 'open'
        message = `Информация о сделке успешно обновлена. Ваш клиент ${client.name} перенесен в список открытых клиентов`
        isChangeStatus = true
        historyMessage = 'Смена статуса на "Открытый"'
      }
    }

    await client.save()
    await Client.findById($set.clientId).populate('trades').exec(async (error, client) => {
      if (isChangeStatus) {
        await historyFn.saveClientInHistory(client, HistoryClient, historyMessage)
      }
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
  let isChangeStatus = false
  let historyMessage = ''
  try {
    const trade = await Trade.findById({ _id: req.params.tradeID })

    await Client.findById(req.params.clientID).populate('trades').exec(async (error, client) => {
      const lastChangedTrade = {
        type: 'trash',
        trade
      }
      await historyFn.saveClientInHistory(client, HistoryClient, 'Удалена сделка', lastChangedTrade)
      if (error) {
        res.status(500).json(error)
      }
    })

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
      isChangeStatus = true
      historyMessage = 'Смена статуса на "Новый"'
    } else if (client.status === 'vip' && !hasVIPtrade) {
      if (client.trades.length >= 3) {
        client.status = 'repeat'
        message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список постоянных клиентов`
        isChangeStatus = true
        historyMessage = 'Смена статуса на "Постоянный"'
      } else {
        client.status = 'open'
        message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список открытых клиентов`
        isChangeStatus = true
        historyMessage = 'Смена статуса на "Открытый"'
      }
    } else if (client.trades.length < 3 && client.status !== 'vip' && client.status !== 'sleep' && client.status !== 'open') {
      client.status = 'open'
      message = `Новая сделка успешно удалена. Ваш клиент ${client.name} перенесен в список открытых клиентов`
      isChangeStatus = true
      historyMessage = 'Смена статуса на "Открытый"'
    }

    await client.save()
    await Client.findById(req.params.clientID).populate('trades').exec(async (error, client) => {
      if (isChangeStatus) {
        await historyFn.saveClientInHistory(client, HistoryClient, historyMessage)
      }
      res.status(201).json({ client, message })
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.params.usertID })
    res.status(201).json(trades)
  } catch (error) {
    res.status(500).json(error)
  }
}
