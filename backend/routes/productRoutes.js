import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controllers/productController.js'
import { protect, admin, verified } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, verified, createProduct)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)

export default router
