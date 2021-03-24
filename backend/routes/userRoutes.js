import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserProducts,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/myproducts').get(protect, getUserProducts)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
