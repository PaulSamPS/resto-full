const { Product, ProductInfo, CategoryType } = require('../models/models')

class ProductService {
  async getAll(productId) {
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Товар не найден в БД')
    }
    const properties = await ProductInfo.findAll({ where: { productId } })
    return properties
  }

  async getOne(productId, id) {
    const product = await Product.findByPk(productId, {
      include: [{ model: CategoryType, as: 'category' }],
    })
    if (!product) {
      throw new Error('Товар не найден в БД')
    }
    const property = await ProductInfo.findOne({ where: { productId, id } })
    if (!property) {
      throw new Error('Свойство товара не найдено в БД')
    }
    return property
  }

  async create(productId, data) {
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Товар не найден в БД')
    }
    const { name, value } = data
    const property = await ProductInfo.create({ name, value, productId })
    return property
  }

  async update(productId, id, data) {
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Товар не найден в БД')
    }
    const property = await ProductInfo.findOne({ where: { productId, id } })
    if (!property) {
      throw new Error('Свойство товара не найдено в БД')
    }
    const { name = property.name, value = property.value } = data
    await property.update({ name, value })
    return property
  }

  async delete(productId, id) {
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Товар не найден в БД')
    }
    const property = await ProductInfo.findOne({ where: { productId, id } })
    if (!property) {
      throw new Error('Свойство товара не найдено в БД')
    }
    await property.destroy()
    return property
  }
}

module.exports = new ProductService()
