const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/add', productController.addProduct)
router.get('/:id', productController.getProduct)
router.get('/', productController.getAllProducts)

module.exports = router
