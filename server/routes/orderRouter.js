const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
/*
 * только для администратора магазина
 */

// получить список всех заказов магазина
router.get('/admin/getall', authMiddleware, adminMiddleware, orderController.adminGetAll)
// получить список заказов пользователя
router.get('/admin/getall/auth/:id', authMiddleware, adminMiddleware, orderController.adminGetUser)
// получить заказ по id
router.get('/admin/getone/:id', authMiddleware, adminMiddleware, orderController.adminGetOne)
// создать новый заказ
router.post('/admin/create', authMiddleware, adminMiddleware, orderController.adminCreate)
// удалить заказ по id
router.delete('/admin/delete/:id', authMiddleware, adminMiddleware, orderController.adminDelete)

/*
 * для авторизованного пользователя
 */

// получить все заказы пользователя
router.get('/auth/getall', authMiddleware, orderController.userGetAll)
// получить один заказ пользователя
router.get('/auth/getone/:id', authMiddleware, orderController.userGetOne)
// создать новый заказ
router.post('/auth/create', authMiddleware, orderController.userCreate)
/*
 * для неавторизованного пользователя
 */

// создать новый заказ
router.post('/guest/create', orderController.guestCreate)

module.exports = router
