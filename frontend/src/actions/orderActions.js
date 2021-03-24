import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/orders`, order, config)
    dispach({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_DETAILS_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispach({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
