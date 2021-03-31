import axios from 'axios'
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants'

export const listProducts = () => async (dispach) => {
  try {
    dispach({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    dispach({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductsDetails = (id) => async (dispach) => {
  try {
    dispach({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispach({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispach, getState) => {
  try {
    dispach({ type: PRODUCT_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/products/${id}`, config)
    dispach({
      type: PRODUCT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispach, getState) => {
  try {
    dispach({ type: PRODUCT_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )
    dispach({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProduct = (
  name,
  price,
  image,
  brand,
  category,
  countInStock,
  description
) => async (dispach, getState) => {
  try {
    dispach({ type: PRODUCT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(
      '/api/products',
      { name, price, image, brand, category, countInStock, description },
      config
    )
    dispach({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createProductReview = (productId, review) => async (
  dispach,
  getState
) => {
  try {
    dispach({ type: PRODUCT_CREATE_REVIEW_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.post(`/api/products/${productId}/reviews`, review, config)
    dispach({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    dispach({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
