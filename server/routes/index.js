const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const categoryRouter = require('./categoryRouter')
const basketRouter = require('./basketRouter')
const productPropRouter = require('./productPropRouter')
const orderPropRouter = require('./orderRouter')

router.use('/auth', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/basket', basketRouter)
router.use('/productPropRouter', productPropRouter)
router.use('/order', orderPropRouter)

module.exports = router
