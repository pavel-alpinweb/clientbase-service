// const Client = require('../models/client.model')

module.exports.create = (req, res) => {
  const $set = { ...req.body }
  console.log($set)
}
