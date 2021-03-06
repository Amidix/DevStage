import React, { useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  //Calculating prices
  cart.itemsPrice = cart.cartItems
    .reduce(
      (acc, item) =>
        acc + (item.onSale ? item.salePrice : item.price) * item.qty,
      0
    )
    .toFixed(2)
  cart.shippingPrice = Number(0)
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET })
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [history, success])

  const items = {
    name: cart.cartItems.name,
    price: cart.cartItems.onSale
      ? cart.cartItems.salePrice
      : cart.cartItems.price,
    product: cart.cartItems.product,
    image: cart.cartItems.image,
    qty: cart.cartItems.qty,
  }

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: {
          name: cart.cartItems.name,
          price: cart.cartItems.onSale
            ? cart.cartItems.salePrice
            : cart.cartItems.price,
          product: cart.cartItems.product,
          image: cart.cartItems.image,
          qty: cart.cartItems.qty,
        },
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
    //const id = order._id ? order._id : 0
  }
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice)
  return (
    <>
      <CustomParallax title='Place Order' img={home_top} height={200} />
      <Container>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <strong>Methode: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart os empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x{' '}
                            {item.onSale ? item.salePrice : item.price} ={' '}
                            {item.qty *
                              (item.onSale ? item.salePrice : item.price)}{' '}
                            Dh
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{cart.itemsPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{cart.shippingPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{cart.totalPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlaceOrderScreen
