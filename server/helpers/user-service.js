const ApiError = require('../error/ApiError')
const { User, Basket } = require('../models/models')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const { sendActivationLink } = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('./dtos')
const { sendResetLink } = require('./reset-email')

class UserService {
  async registration(email, password, name, phone, role, next, id) {
    if (!email || !password) {
      return next(ApiError.internal('Некорректный email или password'))
    }
    const candidateEmail = await User.findOne({ where: { email } })
    if (candidateEmail) {
      return next(ApiError.internal('Пользователь с таким email уже существует'))
    }
    const candidateUserName = await User.findOne({ where: { name } })
    if (candidateUserName) {
      return next(ApiError.internal('Пользователь с таким логином уже существует'))
    }
    const candidatePhone = await User.findOne({ where: { phone } })
    if (candidatePhone) {
      return next(ApiError.internal('Пользователь с таким номером телефона уже существует'))
    }

    const activationLink = uuid.v4()
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create(
      {
        email,
        role,
        password: hashPassword,
        name,
        phone,
        activationLink,
        id,
      },
      { include: Basket }
    )
    await sendActivationLink(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, userDto }
  }

  async login(name, password, user, next) {
    if (!user) {
      return next(ApiError.internal('Пользователь с таким логином не найден'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    if (!user.isActivated) {
      return next(ApiError.internal('Перейдите по ссылке из письма отправленной на email указанный при регистрации'))
    }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    user.isAuthenticated = true
    user.save()
    return { ...tokens, user: userDto }
  }

  async logout(refreshToken, name) {
    const user = await User.findOne({ where: { name } })
    user.isAuthenticated = false
    await user.save()
    return await tokenService.removeToken(refreshToken)
  }

  async refresh(refreshToken, next) {
    if (!refreshToken) {
      next(ApiError.unauthorized('Не авторизован'))
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      next(ApiError.unauthorized('Не авторизован, нет токена'))
    }
    const user = await User.findByPk(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return { ...tokens, user: userDto }
  }

  async reset(email, token, res, next) {
    const user = await User.findOne({ where: { email } })

    if (user) {
      user.resetToken = token
      user.resetTokenExp = Date.now() + 60 * 60 * 1000
      await user.save()
      await sendResetLink(email, `${process.env.API_URL}/api/user/password/${token}`)
      return res.status(200).send('Письмо отправлено')
    } else {
      return next(ApiError.internal('Пользователь с таким email не найден'))
    }
  }

  async passwordToken(token, res, next) {
    const user = await User.findOne({
      resetToken: { token },
      resetTokenExp: { $gt: Date.now() },
    })
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'))
    } else {
      return res.redirect(process.env.CLIENT_URL + '/user-reset-password')
    }
  }

  async changePassword(id, token, res, next) {
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
      return next(ApiError.internal('Время жизни токена истекло, отправьте письмо еще раз'))
    }
  }

  async getOne(id, next) {
    const user = await User.findByPk(id)
    if (!user) {
      next(ApiError.badRequest('Пользователь не найден'))
    }
    const userDto = new UserDto(user)
    return userDto
  }

  async updateEmail(id, next, email) {
    const user = await User.findByPk(id)
    if (!user) {
      next(ApiError.badRequest('Пользователь не найден'))
    }
    await user.update({ email })
    const userDto = new UserDto(user)
    return userDto
  }

  async updateRole(id, next, role) {
    const user = await User.findByPk(id)
    if (!user) {
      next(ApiError.badRequest('Пользователь не найден'))
    }
    await user.update({ role })
    const userDto = new UserDto(user)
    return userDto
  }
}

module.exports = new UserService()
