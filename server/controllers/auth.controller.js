const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const User = require('../models/user.model')
const keys = require('../keys/index')

module.exports.createUser = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (!candidate) {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    await user.save()
    const token = jwt.sign({
      login: user.login,
      userId: user._id
    }, keys.JWT, { expiresIn: 60 * 60 * 2 })
    res.status(201).json(token)
  } else {
    res.status(401).json({ message: 'Такой пользователь уже существует' })
  }
}

module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login })
  if (candidate) {
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)
    if (isPasswordCorrect) {
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, { expiresIn: 60 * 60 * 2 })
      res.json(token)
    } else {
      res.status(401).json({ message: 'Логин или пароль не верный' })
    }
  } else {
    res.status(401).json({ message: 'Логин или пароль не верный' })
  }
}
