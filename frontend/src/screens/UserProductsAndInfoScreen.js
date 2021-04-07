import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { userProductsAndInfo } from '../actions/userActions'

const UserProductsAndInfoScreen = ({ history, match }) => {
  const userId = match.params.id

  const dispatch = useDispatch()

  const userProductsAndInfoo = useSelector((state) => state.userProductsAndInfo)
  const { loading, error, products } = userProductsAndInfoo

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    dispatch(userProductsAndInfo(userId))
  }, [dispatch, history, userInfo, successDelete])

  const produc = products[0]

  return (
    <>
      <div>
        <div className='clearfix' style={{ marginLeft: -280, marginTop: -45 }}>
          <div className='row'>
            <div className='card'>
              <div className='card-body'>
                <div className='avatar'>
                  <img
                    src={produc && produc.user.image}
                    className='card-img-top'
                    alt=''
                  />
                </div>
                <h5 className='card-title'>{produc && produc.user.name}</h5>
                <p className='card-text'>
                  {produc && produc.user.email}
                  <br />
                  <td>
                    {produc && produc.user.isVerified ? (
                      <i className='fas fa-check' style={{ color: 'green' }}>
                        {' '}
                        Verified
                      </i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}>
                        {' '}
                        Not Verified
                      </i>
                    )}
                  </td>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: -280, marginRight: -300 }}>
          <h2>My Products</h2>

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserProductsAndInfoScreen
