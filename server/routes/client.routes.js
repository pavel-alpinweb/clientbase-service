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

// '/api/client/admin/update/clientID'
router.put(
  '/admin/update/:id',
  passport.authenticate('jwt', { session: false }),
  upload.any(),
  ctr.update
)

// '/api/client/admin/archive/clientID/userID'
router.put(
  '/admin/archive/:clientID/:userID',
  passport.authenticate('jwt', { session: false }),
  ctr.archive
)

// '/api/client/admin/reopen/clientID/userID'
router.put(
  '/admin/reopen/:clientID/:userID',
  passport.authenticate('jwt', { session: false }),
  ctr.reopen
)

// '/api/client/admin/sleep/clientID/userID'
router.put(
  '/admin/sleep/:clientID/:userID',
  passport.authenticate('jwt', { session: false }),
  ctr.sleep
)

// '/api/client/admin/userID'
router.get(
  '/admin/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getAll
)

// '/api/client/admin/userID'
router.get(
  '/admin/archive/:id',
  passport.authenticate('jwt', { session: false }),
  ctr.getAllArchive
)

module.exports = router
