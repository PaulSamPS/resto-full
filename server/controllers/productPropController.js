const AppError = require('../error/ApiError')
const productService = require('../helpers/product-services')

class ProductProp {
  async getAll(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error('Не указан id товара')
      }
      const properties = await productService.getAll(req.params.productId)
      res.json(properties)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error('Не указан id товара')
      }
      if (!req.params.id) {
        throw new Error('Не указано id свойства')
      }
      const property = await productService.getOne(
        req.params.productId,
        req.params.id
      )
      res.json(property)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async create(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error('Не указан id товара')
      }
      if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для создания')
      }
      const property = await productService.create(
        req.params.productId,
        req.body
      )
      res.json(property)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error('Не указан id товара')
      }
      if (!req.params.id) {
        throw new Error('Не указано id свойства')
      }
      if (Object.keys(req.body).length === 0) {
        throw new Error('Нет данных для обновления')
      }
      const property = await productService.update(
        req.params.productId,
        req.params.id,
        req.body
      )
      res.json(property)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.productId) {
        throw new Error('Не указан id товара')
      }
      if (!req.params.id) {
        throw new Error('Не указано id свойства')
      }
      const property = await productService.delete(
        req.params.productId,
        req.params.id
      )
      res.json(property)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }
}

module.exports = new ProductProp()
