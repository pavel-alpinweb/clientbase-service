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

module.exports.getAll = async (req, res) => {
  try {
    const clients = await Client.find({ userId: req.params.id }).sort({ date: -1 })
    res.json(clients)
  } catch (error) {
    res.status(500).json(error)
  }
}
