const { Router } = require('express')
const { login, createUser } = require('../controllers/auth.controller')
const router = Router()

// '/api/auth/admin/create'
router.post('/admin/create', createUser)

// '/api/auth/admin/login'
router.post('/admin/login', login)

module.exports = router
