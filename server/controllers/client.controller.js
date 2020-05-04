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
    res.status(201).json(client)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
