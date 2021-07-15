import React, { useEffect, useState } from 'react'
import home_top from '../assets/home_top.jpg'
import CustomParallax from '../components/CustomParallax'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import { listVendorOrders } from '../actions/orderActions'

import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import { updateCountInStock } from '../actions/productActions'
import { resetCart } from '../actions/cartActions'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [isVendorOrder, setisVendorOrder] = useState(false)

  const dispatch = useDispatch()

  const orderListVendor = useSelector((state) => state.orderListVendor)
  const { orders: vendorOrder } = orderListVendor

  //some logic to make sure its the vendors order before we show the mark as delivered button
  vendorOrder.map((order) =>
    Object.values(order.orderItems).map((item) =>
      item.products != null
        ? order._id == orderId
          ? setisVendorOrder(true)
          : null
        : null
    )
  )
  console.log(vendorOrder)
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error, success: successDetails } = orderDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderPay = useSelector((state) => state.orderPay)
  const {
    loading: loadingpayment,
    success: successPay,
    error: errorpayment,
  } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver

  useEffect(() => {
    dispatch(getOrderDetails(orderId))

    if (successDetails) {
      dispatch({ type: ORDER_DETAILS_RESET })
    }
  }, [dispatch, orderId, successDetails])

  if (!loading && order != undefined) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    )
  }
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  })
  useEffect(() => {
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, order, successPay, orderId, successDeliver])

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId))
    dispatch(resetCart())

    //we need to substract the qty from the count in stoc
    Object.values(order.orderItems).map((item) => {
      console.log('id', item._id, 'qty', item.qty)
      dispatch(updateCountInStock(item.product, item.qty))
    })
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <CustomParallax
        title='Order Details'
        text=''
        img={home_top}
        height={200}
      />

      <Container>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item className='shipping'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name : </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email :</strong>{' '}
                  <a hef={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className='shipping'>
                <h2>Payment Method</h2>
                <p>
                  <strong>Methode: </strong>
                  {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item className='shipping'>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
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
              <ListGroup variant='flush' className='order-sum'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>{order.itemsPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{order.shippingPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{order.totalPrice} Dh</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingpayment && <Loader />}
                    {errorpayment && (
                      <Message variant='danger'>{errorpayment}</Message>
                    )}
                    <Button
                      type='button'
                      className='custom-btn'
                      onClick={successPaymentHandler}
                    >
                      Pay
                    </Button>
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isVerified &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={deliverHandler}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OrderScreen
