const { Router } = require('express')
const passport = require('passport')
const ctr = require('../controllers/client.controller')
const router = Router()
const upload = require('../middleware/upload')

// '/api/client/admin/create'
router.post(
  '/admin/create',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  ctr.create
)

module.exports = router
