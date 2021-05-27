import React, { Component } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
//import {postItemsUpdate} from "../utils/api";
import { addToCart, removeFromCart } from '../actions/cartActions'

//const productId

const CustomButtonGroup = ({ id }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  var idcar = cartItems[0] ? cartItems[0].product : id
  var pro = cartItems.find((e) => e.product == id)
  if (pro === undefined) {
    pro = 0
  }
  const addCartElement = (
    <Button
      className='py-2'
      variant='outline-dark'
      onClick={(e) => dispatch(addToCart(id, idcar, 1))}
    >
      Add to Cart
    </Button>
  )
  console.log('product id:', id)
  const plusMinusElement = (
    <FormControl
      as='select'
      value={pro.qty}
      onChange={(e) => dispatch(addToCart(id, idcar, Number(e.target.value)))}
    >
      {[...Array(pro.countInStock).keys()].map((x) => (
        <option key={x + 1} value={x + 1}>
          {x + 1}
        </option>
      ))}
    </FormControl>
  )
  const num = pro.qty
  return !num || num === 0 ? addCartElement : plusMinusElement
}

export default CustomButtonGroup
