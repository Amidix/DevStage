import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import home_top from '../assets/home_top.jpg'
import CustomParallax from '../components/CustomParallax'
import { Button, Table, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import Paginate from '../components/Paginate'

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, page, pages } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders(pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, pageNumber])

  return (
    <>
      <CustomParallax title='ORDERS' text='' img={home_top} height='30em' />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>

                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice} Dh</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={page} pages={pages} link2={`admin/orderlist`}></Paginate>
    </>
  )
}

export default OrderListScreen
