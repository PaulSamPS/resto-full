const ApiError = require('../error/ApiError')
const { ProductInfo, Product } = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class ProductController {
  async addProduct(req, res, next) {
    try {
      // Получаем данные из боди
      let { name, price, description, weight, category, info } = req.body
      // Генерация уникального id
      const id = uuid.v4()
      // Получаем изображение
      const { img } = req.files
      // Генерация уникального имени изображения
      let fileName = uuid.v4() + '.jpg'
      // Сохранение изображения в папку
      await img.mv(path.resolve(__dirname, '..', 'static/products', fileName))
      // Создание продукта
      const product = await Product.create({
        id,
        name,
        price,
        description,
        weight,
        category,
        img: fileName,
      })
      // Если есть доп информация о продукте, то добавляем её
      if (info) {
        info = JSON.parse(info)
        const id = uuid.v4()
        // Проходим по массиву и для каждого item присваиваем уникальные значения
        info.forEach((i) =>
          ProductInfo.create({
            id,
            name: i.name,
            value: i.value,
            productId: product.id,
          })
        )
      }
      res.status(200).send(product)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getProduct(req, res) {
    // Получаем Id из запроса
    const { id } = req.params
    // Поиск в бд по Id и подцепляем доп информацию продукта
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }],
    })
    return res.json(product)
  }

  async getAllProducts(req, res) {
    // Получаем данные из query запроса если они указаны
    let { category, limit, page } = req.query
    // Начальня страница
    page = page || 1
    // Всего продуктов на странице
    limit = limit || 9
    // Колличество страниц
    let offset = page * limit - limit
    // Объявляем продукт
    let product
    // Если не указана категория то выдаются все продукты
    if (!category) {
      product = await Product.findAndCountAll({ limit, offset })
    }
    // Если категория указана то выдаются продукты с этой категории
    if (category) {
      product = await Product.findAndCountAll({
        where: { category },
        limit,
        offset,
      })
    }
    return res.json(product)
  }
}

module.exports = new ProductController()
