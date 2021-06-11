import React, { useEffect } from 'react'
import { Table, Button, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listVendorOrders } from '../actions/orderActions'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const VendorOrdersScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderListVendor = useSelector((state) => state.orderListVendor)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListVendor

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listVendorOrders())
    }
  }, [dispatch, history, userInfo])

  console.log('my orders', orders)
  return (
    <>
      <CustomParallax title='My Orders' text='' img={home_top} height='30em' />

      <Container>
        <Row>
          <Col>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>

                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <>
                      {' '}
                      {Object.values(order.orderItems).map((item) =>
                        item.product != null ? (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                              {order.isPaid ? (
                                order.paidAt.substring(0, 10)
                              ) : (
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}
                                ></i>
                              )}
                            </td>
                            <td>
                              {order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)
                              ) : (
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}
                                ></i>
                              )}
                            </td>
                            <td>
                              <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm' variant='light'>
                                  Details
                                </Button>
                              </LinkContainer>
                            </td>
                          </tr>
                        ) : null
                      )}
                    </>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default VendorOrdersScreen
