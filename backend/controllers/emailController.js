import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import sendMail from '../utils/mailing.js'
import User from '../models/userModel.js'

// `secret` is passwordHash concatenated with user's
// createdAt value, so if someone malicious gets the
// token they still need a timestamp to hack it:

export const usePasswordHashToMakeToken = ({
  password: passwordHash,
  _id: userId,
  createdAt,
}) => {
  // highlight-start
  const secret = passwordHash + '-' + createdAt
  const token = jwt.sign({ userId }, secret, {
    expiresIn: '3m', // 3min
  })
  // highlight-end
  return token
}

export const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user._id}/${token}`

//// Sends an email IRL! ////
export const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.params
  let user
  try {
    user = await User.findOne({ email }).exec()
  } catch (err) {
    res.status(404).json('No user with that email')
  }
  const token = usePasswordHashToMakeToken(user)
  const url = getPasswordResetURL(user, token)
  sendMail(email, user.name, 'resetPassword', url)
}

export const receiveNewPassword = (req, res) => {
  const { userId, token } = req.params
  const { password } = req.body
  // highlight-start
  User.findOne({ _id: userId })
    .then((user) => {
      const secret = user.password + '-' + user.createdAt
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.status(401).json(err)
          console.log('err' + err)
        }
        return
      })
      const payload = jwt.decode(token, secret)
      if (payload.userId === user.id) {
        bcrypt.genSalt(10, function (err, salt) {
          // Call error-handling middleware:
          if (err) return
          bcrypt.hash(password, salt, function (err, hash) {
            // Call error-handling middleware:
            if (err) return
            User.findOneAndUpdate({ _id: userId }, { password: hash })
              .then(() => res.status(202).json('Password changed accepted'))
              .catch((err) => res.status(500).json(err))
          })
        })
      }
    })
    // highlight-end
    .catch(() => {
      res.status(404).json('Invalid user')
    })
}
