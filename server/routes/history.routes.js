const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/history.controller')
const router = Router()

// '/api/history/admin/userID'
router.get(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getHistory
)

module.exports = router
