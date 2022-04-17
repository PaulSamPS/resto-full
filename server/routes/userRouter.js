const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/getall', authMiddleware, adminMiddleware, userController.getAll)
router.get('/getone/:id', authMiddleware, adminMiddleware, userController.getOne)
router.post('/update-email/:id', authMiddleware, userController.updateEmail)
router.post('/update-role', authMiddleware, adminMiddleware, userController.updateRole)

//  отправка ссылки для смены пароля
router.post('/reset', userController.reset)

//  проверка токена на валидность
router.get('/password/:token', userController.passwordToken)

//  смена пароля
router.post('/password-change', userController.changePassword)

//  обновление токенов
router.get('/refresh', userController.refresh)

module.exports = router
