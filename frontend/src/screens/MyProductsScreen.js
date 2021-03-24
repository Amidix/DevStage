import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Row, Col } from 'react-bootstrap'
import { userlistProducts } from '../actions/userActions'

const MyProductsScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userProductList = useSelector((state) => state.userProductList)
  const { loading, error, products } = userProductList
  console.log(products)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(userlistProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>My Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default MyProductsScreen
