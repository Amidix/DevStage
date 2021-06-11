import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_VENDOR_REQUEST,
  ORDER_LIST_VENDOR_SUCCESS,
  ORDER_LIST_VENDOR_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
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

export const payOrder =
  (orderId /*paymentResult*/) => async (dispach, getState) => {
    try {
      dispach({ type: ORDER_PAY_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      //const { data } = await axios.put(`/api/orders/${orderId}/pay`, config)
      const { data } = await axios({
        method: 'put',
        url: `/api/orders/${orderId}/pay`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      dispach({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispach({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deliverOrder = (order) => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_DELIVER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const { data } = await axios({
      method: 'put',
      url: `/api/orders/${order._id}/deliver`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispach({
      type: ORDER_DELIVER_SUCCESS,
      DELIVERload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyOrders = () => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_LIST_MY_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/myorders`, config)
    dispach({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders = () => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders`, config)
    dispach({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listVendorOrders = () => async (dispach, getState) => {
  try {
    dispach({ type: ORDER_LIST_VENDOR_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/vendororders`, config)
    dispach({
      type: ORDER_LIST_VENDOR_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispach({
      type: ORDER_LIST_VENDOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
