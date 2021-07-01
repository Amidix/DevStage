import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import sendMail from '../utils/mailing.js'
import {
  sendPasswordResetEmail,
  receiveNewPassword,
} from '../controllers/emailController.js'

const router = express.Router()

router.route('/').post((req, res) => {
  console.log(req.body)
  sendMail(req.body.email, req.body.name, 'verified')
})
router.route('/user/:email').post(sendPasswordResetEmail)
router.route('/receive_new_password/:userId/:token').post(receiveNewPassword)

export default router
