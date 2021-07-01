import nodemailer from 'nodemailer'
import verifiedhtml from './verifiedMailTemplate.js'
import passwordResethtml from './passwordResetTemplate.js'

const getEmailData = (to, name, template, url) => {
  let data = null
  switch (template) {
    case 'verified':
      data = {
        from: 'Amine <aminebousslama2@gmail.com>',
        to: to,
        subject: `Hello ${name}, You have been verified`,
        html: verifiedhtml(name),
      }
      break
    case 'resetPassword':
      data = {
        from: 'Amine <aminebousslama2@gmail.com>',
        to: to,
        subject: `Password Reset`,
        html: passwordResethtml(to, name, url),
      }
      break
    default:
      data
  }
  return data
}
const sendMail = (to, name, type, url) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aminebousslama2@gmail.com',
      pass: 'Shitshit',
    },
  })

  const mailOptions = getEmailData(to, name, type, url)

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
    transporter.close()
  })
}
export default sendMail
