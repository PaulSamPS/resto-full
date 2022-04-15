const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.get('/getone', basketController.getOne)
router.put('/product/:productId/append/:quantity', basketController.append)
router.put(
  '/product/:productId/increment/:quantity',
  basketController.increment
)
router.put(
  '/product/:productId/decrement/:quantity',
  basketController.decrement
)
router.put('/product/:productId/remove', basketController.remove)
router.put('/clear', basketController.clear)

module.exports = router
