const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
/*
 * только для администратора магазина
 */

// получить список всех заказов магазина
router.get('/admin/getall', orderController.adminGetAll)
// получить список заказов пользователя
router.get('/admin/getall/user/:id', orderController.adminGetUser)
// получить заказ по id
router.get('/admin/getone/:id', orderController.adminGetOne)
// создать новый заказ
router.post('/admin/create', orderController.adminCreate)
// удалить заказ по id
router.delete('/admin/delete/:id', orderController.adminDelete)

/*
 * для авторизованного пользователя
 */

// получить все заказы пользователя
router.get('/user/getall', orderController.userGetAll)
// получить один заказ пользователя
router.get('/user/getone/:id', orderController.userGetOne)
// создать новый заказ
router.post('/user/create', orderController.userCreate)
/*
 * для неавторизованного пользователя
 */

// создать новый заказ
router.post('/guest/create', orderController.guestCreate)

module.exports = router
