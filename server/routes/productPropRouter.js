const Router = require('express')
const router = new Router()
const productPropController = require('../controllers/productPropController')

router.post('//:productId/property/create', productPropController.create)
router.put(
  '/:productId/property/update/:id([0-9]+)',
  productPropController.delete
)
router.delete(
  '/:productId/property/delete/:id([0-9]+)',
  productPropController.update
)

module.exports = router
