const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const keys = require('./keys')
const authRoutes = require('./routes/auth.routes')
const clientRoutes = require('./routes/client.routes')
const tradeRoutes = require('./routes/trade.routes')
const app = express()

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB connected...')
  })
  .catch((error) => {
    console.error(error)
  })

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/trade', tradeRoutes)

module.exports = app
