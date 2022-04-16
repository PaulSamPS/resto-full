const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { User } = require('../models/models')
const userService = require('../helpers/user-service')
const uuid = require('uuid')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, name, phone, role } = req.body
      const id = uuid.v4()

      const userData = await userService.registration(email, password, name, phone, role, next, id)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      console.log(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      const user = await User.findOne({ where: { activationLink } })
      if (!user) {
        return next(ApiError.badRequest('Неккоректная ссылка активации'))
      }
      user.isActivated = true
      user.activationLink = null
      await user.save()
      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res, next) {
    try {
      const { password, name } = req.body
      const user = await User.findOne({ where: { name } })
      const userData = await userService.login(name, password, user, next)
      res.cookie('refreshToken', userData.refreshToken, userData.user.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      console.log(e)
    }
  }

  async logout(req, res, next) {
    try {
      const { name } = req.body
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken, name)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken, next)
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      return res.json({
        accessToken: userData.accessToken,
        user: userData.user,
      })
    } catch (e) {
      next(e)
    }
  }

  reset(req, res, next) {
    crypto.randomBytes(32, async (err, buffer) => {
      const token = buffer.toString('hex')
      const { email } = req.body
      await userService.reset(email, token, res, next)
    })
  }

  async passwordToken(req, res, next) {
    try {
      const { token } = req.params
      await userService.passwordToken(token, res, next)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async changePassword(req, res, next) {
    const { id, token } = req.body
    await userService.changePassword(id, token, res, next)
  }

  async getOne(req, res, next) {
    const { id } = req.params
    try {
      if (!id) {
        next(ApiError.badRequest('Не указан id пользователя'))
      }
      const user = await userService.getOne(id, next)
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const user = await User.findAll()
      return res.json(user)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async updateEmail(req, res, next) {
    const { email } = req.body
    const { id } = req.params
    const user = await userService.updateEmail(id, next, email)
    return res.json(user)
  }

  async updateRole(req, res, next) {
    const { id, role } = req.body
    const user = await userService.updateRole(id, next, role)
    return res.json(user)
  }
}

module.exports = new UserController()
