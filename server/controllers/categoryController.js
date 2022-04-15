const { CategoryType } = require('../models/models')
const uuid = require('uuid')

class CategoryController {
  async addCategory(req, res) {
    const id = uuid.v4()
    const { name } = req.body
    const type = await CategoryType.create({ name, id })
    return res.json(type)
  }

  async getAllCategory(req, res) {
    const types = await CategoryType.findAll()
    return res.json(types)
  }
}

module.exports = new CategoryController()
