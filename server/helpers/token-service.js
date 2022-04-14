const jwt = require('jsonwebtoken')
const { Token } = require('../models/models')
const uuid = require('uuid')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '15s',
    })
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
      expiresIn: '30s',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ where: { userId: userId } })
    const id = uuid.v4()
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    return await Token.create({ userId: userId, refreshToken, id })
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_KEY)
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.SECRET_REFRESH_KEY)
    } catch (e) {
      return null
    }
  }

  async removeToken(refreshToken) {
    return await Token.destroy({ where: { refreshToken } })
  }

  async findToken(refreshToken) {
    return await Token.findOne({ where: { refreshToken } })
  }
}

module.exports = new TokenService()
