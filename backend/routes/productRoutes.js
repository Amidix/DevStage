import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from '../controllers/productController.js'
import { protect, admin, verified } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, verified, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, updateProduct)

export default router
