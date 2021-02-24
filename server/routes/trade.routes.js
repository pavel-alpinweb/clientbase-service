const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/trade.controller')
const router = Router()

// '/api/trade/admin/:usertID'
router.get(
  '/admin/:usertID',
  passport.authenticate('jwt', { session: false }),
  ctr.getAll
)

// '/api/trade/admin/create'
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }),
  ctr.create
)

// '/api/trade/admin/update/id'
router.put(
  '/admin/update/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.update
)

// '/api/trade/admin/delete/id'
router.delete(
  '/admin/delete/:clientID/:tradeID',
  passport.authenticate('jwt', { session: false }),
  ctr.remove
)

module.exports = router
