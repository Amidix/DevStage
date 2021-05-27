import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import CustomButtonGroup from './CustomButtonGroup'
import { FiTrash2 } from 'react-icons/fi'
import { round } from '../utils/functions'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { FormControl } from 'react-bootstrap'

const CartTableItem = ({ product, image, name, price, qty, countInStock }) => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  var idcar = cartItems[0] ? cartItems[0].product : product
  const dispatch = useDispatch()
  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product))
  }

  return (
    <tr className='text-center'>
      <td className='align-middle'>
        <FiTrash2
          className='mr-2 shadow-sm'
          size='1.2em'
          onClick={() => removeFromCartHandler(product)}
        />
      </td>
      <td className='align-middle'>
        <Image style={{ height: 110, width: 110 }} src={image} rounded />
      </td>
      <td className='align-middle'>{name}</td>
      <td className='align-middle'>{price} Dh</td>
      <td className='align-middle'>
        {' '}
        <FormControl
          as='select'
          value={qty}
          onChange={(e) =>
            dispatch(addToCart(product, idcar, Number(e.target.value)))
          }
        >
          {[...Array(countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </FormControl>
      </td>
      <td className='align-middle'>{round(price * qty)} Dh</td>
    </tr>
  )
}

export default CartTableItem
