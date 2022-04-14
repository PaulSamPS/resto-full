const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { User } = require('../models/models')
const { sendResetLink } = require('../helpers/reset-email')
const userService = require('../helpers/user-service')
const uuid = require('uuid')

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, name, phone, role } = req.body
      const id = uuid.v4()

      const userData = await userService.registration(
        email,
        password,
        name,
        phone,
        role,
        next,
        id
      )
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
      const user = await User.findOne({ where: { email } })

      if (user) {
        user.resetToken = token
        user.resetTokenExp = Date.now() + 60 * 60 * 1000
        await user.save()
        await sendResetLink(
          email,
          `${process.env.API_URL}/api/user/password/${token}`
        )
        return res.redirect(process.env.CLIENT_URL)
      } else {
        return next(ApiError.internal('Пользователь с таким email не найден'))
      }
    })
  }

  async passwordToken(req, res, next) {
    try {
      const { token } = req.params
      const user = await User.findOne({
        resetToken: { token },
        resetTokenExp: { $gt: Date.now() },
      })
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
      } else {
        return res.redirect(process.env.CLIENT_URL + '/user-reset-password')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async password(req, res, next) {
    const { id, token } = req.body
    const user = await User.findOne({
      id: { id },
      resetToken: { token },
      resetTokenExp: { $gt: Date.now() },
    })

    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10)
      user.resetToken = undefined
      user.resetTokenExp = undefined
      await user.save()
      res.redirect(process.env.CLIENT_URL)
    } else {
      return next(ApiError.internal('Время жизни токена истекло'))
    }
  }
}

module.exports = new UserController()
