const ApiError = require('../error/ApiError')
const { User } = require('../models/models')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const { sendActivationLink } = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('./dtos')

class UserService {
  async registration(email, password, name, phone, role, next, id) {
    if (!email || !password) {
      return next(ApiError.internal('Некорректный email или password'))
    }
    const candidateEmail = await User.findOne({ where: { email } })
    if (candidateEmail) {
      return next(
        ApiError.internal('Пользователь с таким email уже существует')
      )
    }
    const candidateUserName = await User.findOne({ where: { name } })
    if (candidateUserName) {
      return next(
        ApiError.internal('Пользователь с таким логином уже существует')
      )
    }
    const candidatePhone = await User.findOne({ where: { phone } })
    if (candidatePhone) {
      return next(
        ApiError.internal(
          'Пользователь с таким номером телефона уже существует'
        )
      )
    }

    const activationLink = uuid.v4()
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({
      email,
      role,
      password: hashPassword,
      name,
      phone,
      activationLink,
      id,
    })
    await sendActivationLink(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    )
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
      return next(
        ApiError.internal(
          'Перейдите по ссылке из письма отправленной на email указанный при регистрации'
        )
      )
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
}

module.exports = new UserService()
