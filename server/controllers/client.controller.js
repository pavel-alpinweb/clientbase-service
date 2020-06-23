const Client = require('../models/client.model')
const HistoryClient = require('../models/history-client.model')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }

  if (req.files) {
    for (const image of req.files) {
      $set.image = image.location
    }
  }

  const client = new Client($set)
  const historyClient = new HistoryClient($set)
  historyClient.change = 'Клиент создан'
  try {
    const clientsArray = await Client.find({ userId: $set.userId })
    client.id = `client0${clientsArray.length + 1}`
    historyClient.id = `client0${clientsArray.length + 1}`
    await client.save()
    await historyClient.save()
    res.status(201).json({ client })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.update = async (req, res) => {
  const $set = { ...req.body }

  if (req.files) {
    for (const image of req.files) {
      $set.image = image.location
    }
  }
  $set.trades = JSON.parse($set.trades)
  const historyClient = new HistoryClient($set)
  historyClient.change = 'Обновлена информация'
  delete $set.trades
  try {
    await historyClient.save()
    await Client.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
      .populate('trades').exec((error, client) => {
        res.status(201).json({ client })
        if (error) {
          res.status(500).json(error)
        }
      })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.archive = async (req, res) => {
  try {
    await Client.findOneAndUpdate({ _id: req.params.clientID }, { status: 'archive', date: new Date() }, { new: true })
      .populate('trades').exec((error, client) => {
        res.status(201).json({ client })
        if (error) {
          res.status(500).json(error)
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.reopen = async (req, res) => {
  try {
    await Client.findOneAndUpdate({ _id: req.params.clientID }, { status: 'open', date: new Date() }, { new: true })
      .populate('trades').exec((error, client) => {
        res.status(201).json({ client })
        if (error) {
          res.status(500).json(error)
        }
      })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.sleep = async (req, res) => {
  try {
    await Client.findOneAndUpdate({ _id: req.params.clientID }, { status: 'sleep', date: new Date() }, { new: true })
      .populate('trades').exec((error, client) => {
        res.status(201).json({ client })
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
    await Client.find({ userId: req.params.id }).sort({ date: -1 }).populate('trades').exec((error, clients) => {
      res.json(clients)
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports.getAllArchive = async (req, res) => {
  try {
    await Client.find({ userId: req.params.id, status: 'archive' }).sort({ date: -1 }).populate('trades').exec((error, clients) => {
      res.json(clients)
      if (error) {
        res.status(500).json(error)
      }
    })
  } catch (error) {
    res.status(500).json(error)
  }
}
