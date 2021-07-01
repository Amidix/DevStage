import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('CreditCard')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <>
      <CustomParallax title='Payment Method' img={home_top} height={200} />

      <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>

            <Col>
              <Form.Check
                type='radio'
                label='Credit Cart'
                id='CreditCard'
                name='paymentMethod'
                value='CreditCard'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label='Pay At Delivery'
                id='PayAtDelivery'
                name='paymentMethod'
                value='PayAtDelivery'
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
