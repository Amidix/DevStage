import React, { Component } from 'react'
import { Row, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { FiTrash2 } from 'react-icons/fi'
import CustomButtonGroup from './CustomButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import { round } from '../utils/functions'
import { addToCart, removeFromCart } from '../actions/cartActions'

const HoverPopupItem = ({
  product,
  name,
  image,
  price,
  qty,
  onSale,
  salePrice,
}) => {
  const dispatch = useDispatch()
  const removeFromCartHandler = (product) => {
    dispatch(removeFromCart(product))
  }

  return (
    <Row className='py-2 border-bottom border-top'>
      <Col xs={7} className='ml-3 px-0'>
        <Row>
          <Col className='my-auto pl-0 pr-1 text-right' xs={3}>
            <FiTrash2
              className='shadow-sm my-auto'
              size='1.2em'
              onClick={() => removeFromCartHandler(product)}
            />
          </Col>
          <Col className='my-auto pl-1' xs={9}>
            <h6 className='my-auto text-left'>{name}</h6>
          </Col>
        </Row>

        <Row className='mt-2 mx-0'>
          <Col className='my-auto pr-0'>
            <h6 className='text-left my-auto'>
              x {qty} = {round((onSale ? salePrice : price) * qty)} Dh
            </h6>
          </Col>
        </Row>
      </Col>

      <Col className='ml-0 pl-0 my-auto' xs={4}>
        <Image
          className='text-left ml-0 pl-0'
          style={{ height: '5em', width: '5em' }}
          src={image}
          rounded
        />
      </Col>
    </Row>
  )
}

export default HoverPopupItem
