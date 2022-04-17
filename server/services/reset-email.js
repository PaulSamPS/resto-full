const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

class ResetService {
  async sendResetLink(to, link) {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Восстановление пароля ' + process.env.API_URL,
      text: '',
      html: `
              <div>
                  <h1>Забыли пароль?</h1>
                  <p>Если нет, то проигнорируйте данное письмо</p>
                  <p>Если да, то перейдите по ссылке для восстановления пароля</p>
                  <p>Ссылка действительна 1 час</p>
                  <a href="${link}">Восстановить пароль</a>
              </div>
            `,
    })
  }
}

module.exports = new ResetService()
