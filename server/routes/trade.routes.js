const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/trade.controller')
const router = Router()

// '/api/trade/admin/create'
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }),
  ctr.create
)

module.exports = router
