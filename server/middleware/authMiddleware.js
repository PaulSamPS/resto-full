const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      next(ApiError.unauthorized('Не авторизован'))
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.auth = decoded
    console.log(req.auth)
    next()
  } catch (e) {
    next(ApiError.unauthorized('Не авторизован'))
  }
}
