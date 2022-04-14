const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/reset', userController.reset)
router.post('/password', userController.password)
router.get('/activate/:link', userController.activate)
router.get('/password/:token', userController.passwordToken)
router.get('/refresh', userController.refresh)

module.exports = router
