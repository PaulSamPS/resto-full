const orderService = require('../helpers/order-service')
const basketService = require('../helpers/basket-service')
const userService = require('../helpers/user-service')
const AppError = require('../error/ApiError')

class OrderController {
  adminCreate = async (req, res, next) => {
    await this.create(req, res, next, 'admin')
  }

  userCreate = async (req, res, next) => {
    await this.create(req, res, next, 'user')
  }

  guestCreate = async (req, res, next) => {
    await this.create(req, res, next, 'guest')
  }

  async create(req, res, next, type) {
    try {
      const { name, email, phone, address, comment = null } = req.body
      // данные для создания заказа
      if (!name) {
        next(AppError.badRequest('Не указано имя покупателя'))
      }
      if (!email) {
        next(AppError.badRequest('Не указан email покупателя'))
      }
      if (!phone) {
        next(AppError.badRequest('Не указан телефон покупателя'))
      }
      if (!address) {
        next(AppError.badRequest('Не указан адрес доставки'))
      }
      let items,
        userId = null
      if (type === 'admin') {
        // когда заказ делает админ, id пользователя и состав заказа в теле запроса
        if (!req.body.items) {
          next(AppError.badRequest('Не указан состав заказа'))
        }
        if (req.body.items.length === 0) {
          next(AppError.badRequest('Не указан состав заказа'))
        }
        items = req.body.items
        // проверяем существование пользователя
        userId = req.body.userId ?? null
        if (userId) {
          await userService.getOne(userId) // будет исключение, если не найден
        }
      } else {
        // когда заказ делает обычный пользователь (авторизованный или нет), состав
        // заказа получаем из корзины, а id пользователя из req.auth.id (если есть)
        if (!req.signedCookies.basketId) {
          next(AppError.badRequest('Ваша корзина пуста'))
        }
        const basket = await basketService.getOne(
          parseInt(req.signedCookies.basketId)
        )
        if (basket.products.length === 0) {
          next(AppError.badRequest('Ваша корзина пуста'))
        }
        items = basket.products
        userId = req.auth?.id ?? null
      }

      // все готово, можно создавать
      const order = await orderService.create({
        name,
        email,
        phone,
        address,
        comment,
        items,
        userId,
      })
      // корзину теперь нужно очистить
      await basketService.clear(parseInt(req.signedCookies.basketId))
      res.json(order)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async adminGetAll(req, res, next) {
    try {
      const orders = await orderService.getAll()
      res.json(orders)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async adminGetUser(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Не указан id пользователя'))
      }
      const order = await orderService.getAll(req.params.id)
      res.json(order)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async adminGetOne(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Не указан id заказа'))
      }
      const order = await orderService.getOne(req.params.id)
      res.json(order)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async adminDelete(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Не указан id заказа'))
      }
      const order = await orderService.delete(req.params.id)
      res.json(order)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async userGetAll(req, res, next) {
    try {
      const orders = await orderService.getAll(req.auth.id)
      res.json(orders)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }

  async userGetOne(req, res, next) {
    try {
      if (!req.params.id) {
        next(AppError.badRequest('Не указан id заказа'))
      }
      const order = await orderService.getOne(req.params.id, req.auth.id)
      res.json(order)
    } catch (e) {
      next(AppError.badRequest(e.message))
    }
  }
}

module.exports = new OrderController()
