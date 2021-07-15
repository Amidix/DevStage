import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const CartTotalsCart = ({ qty, totalPrice, disabled, buttonText }) => {
  return (
    <div>
      <h4 className='text-uppercase my-auto'>Cart Totals</h4>
      <Card className='mt-3'>
        <Card.Header className='pl-2 font-weight-bold'>
          {qty} Products
        </Card.Header>
        <Card.Body className='d-flex justify-content-between p-2 mt-3'>
          <Card.Text>Products Price</Card.Text>
          <Card.Text>{totalPrice} Dh</Card.Text>
        </Card.Body>

        <Card.Body className='d-flex justify-content-between p-2'>
          <Card.Text>Delivery</Card.Text>
          <Card.Text>{0} Dh</Card.Text>
        </Card.Body>

        <Card.Body className='d-flex justify-content-between p-2'>
          <Card.Text>Total</Card.Text>
          <Card.Text>{totalPrice} Dh</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to='/login?redirect=shipping'>
            <Button variant='warning' block disabled={disabled}>
              {buttonText}
            </Button>
          </Link>
          <hr />
          <h6 className='mt-3'>
            WE ACCEPT:
            <Image
              className='img-thumbnail mt-1'
              src='https://assets.asosservices.com/asos-finance/images/marketing/single.png'
              alt='payment options'
            />
          </h6>
        </Card.Footer>
      </Card>
    </div>
  )
}

export default CartTotalsCart
