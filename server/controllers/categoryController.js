const { CategoryType } = require('../models/models')
const uuid = require('uuid')

class CategoryController {
  async addCategory(req, res) {
    const { name } = req.body
    const type = await CategoryType.create({ name })
    return res.json(type)
  }

  async getAllCategory(req, res) {
    const types = await CategoryType.findAll()
    return res.json(types)
  }
}

module.exports = new CategoryController()
