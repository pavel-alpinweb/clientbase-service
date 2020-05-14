const Client = require('../models/client.model')

module.exports.create = async (req, res) => {
  const $set = { ...req.body }

  if (req.files) {
    for (const image of req.files) {
      $set.image = image.location
    }
  }

  const client = new Client($set)

  try {
    await client.save()
    const clients = await Client.find({ userId: $set.userId }).sort({ date: -1 })
    res.status(201).json(clients)
  } catch (error) {
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

  try {
    await Client.findOneAndUpdate({ _id: req.params.id }, { $set }, { new: true })
    const clients = await Client.find({ userId: $set.userId }).sort({ date: -1 })
    res.status(201).json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.archive = async (req, res) => {
  try {
    await Client.findOneAndUpdate({ _id: req.params.clientID }, { status: 'archive', date: new Date() }, { new: true })
    const clients = await Client.find({ userId: req.params.userID }).sort({ date: -1 })
    res.status(201).json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

module.exports.getAll = async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.params.id }).sort({ date: -1 })
    res.json(clients)
  } catch (error) {
    res.status(500).json(error)
  }
}
