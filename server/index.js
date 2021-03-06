require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
)
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
