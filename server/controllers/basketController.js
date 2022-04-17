const AppError = require('../error/ApiError')
const basketService = require('../services/basket-service')

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class BasketController {
  async getOne(req, res, next) {
    try {
      let basket
      if (req.signedCookies.basketId) {
        basket = await basketService.getOne(parseInt(req.signedCookies.basketId))
      } else {
        basket = await basketService.create()
      }
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async append(req, res, next) {
    try {
      let basketId
      if (!req.signedCookies.basketId) {
        let created = await basketService.create()
        basketId = created.id
      } else {
        basketId = parseInt(req.signedCookies.basketId)
      }
      const { productId, quantity } = req.params
      const basket = await basketService.append(basketId, productId, quantity)
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async increment(req, res, next) {
    try {
      let basketId
      if (!req.signedCookies.basketId) {
        let created = await basketService.create()
        basketId = created.id
      } else {
        basketId = parseInt(req.signedCookies.basketId)
      }
      const { productId, quantity } = req.params
      const basket = await basketService.increment(basketId, productId, quantity)
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async decrement(req, res, next) {
    try {
      let basketId
      if (!req.signedCookies.basketId) {
        let created = await basketService.create()
        basketId = created.id
      } else {
        basketId = parseInt(req.signedCookies.basketId)
      }
      const { productId, quantity } = req.params
      const basket = await basketService.decrement(basketId, productId, quantity)
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async remove(req, res, next) {
    try {
      let basketId
      if (!req.signedCookies.basketId) {
        let created = await basketService.create()
        basketId = created.id
      } else {
        basketId = parseInt(req.signedCookies.basketId)
      }
      const basket = await basketService.remove(basketId, req.params.productId)
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async clear(req, res, next) {
    try {
      let basketId
      if (!req.signedCookies.basketId) {
        let created = await basketService.create()
        basketId = created.id
      } else {
        basketId = parseInt(req.signedCookies.basketId)
      }
      const basket = await basketService.clear(basketId)
      res.cookie('basketId', basket.id, { maxAge, signed })
      res.json(basket)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }
}

module.exports = new BasketController()
