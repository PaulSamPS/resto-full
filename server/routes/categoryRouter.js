const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/create', categoryController.addCategory)
router.get('/', categoryController.getAllCategory)

module.exports = router
