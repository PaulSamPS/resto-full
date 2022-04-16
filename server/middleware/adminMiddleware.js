const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    if (req.auth.role !== 'ADMIN') {
      next(ApiError.forbidden('Только для администратора'))
    }
    next()
  } catch (e) {
    next(ApiError.forbidden(e.message))
  }
}
