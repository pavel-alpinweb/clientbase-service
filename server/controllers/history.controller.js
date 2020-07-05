const HistoryClient = require('../models/history-client.model')

module.exports.getHistory = async (req, res) => {
  try {
    const clients = await HistoryClient.find({ userId: req.params.id }).sort({ date: -1 })
    res.status(201).json(clients)
  } catch (error) {
    res.status(500).json(error)
  }
}
