import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'
import { LinkContainer } from 'react-router-bootstrap'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { userlistProducts } from '../actions/userActions'
import { deleteProduct } from '../actions/productActions'

const MyProductsScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userProductList = useSelector((state) => state.userProductList)
  const { loading, error, products } = userProductList
  console.log(products)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  useEffect(() => {
    if (userInfo) {
      dispatch(userlistProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }
  return (
    <>
      <CustomParallax
        title='My Products'
        text=''
        img={home_top}
        height='30em'
      />
      <Container>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div>
            <Link className='btn btn-light my-3' to='/createproduct'>
              Create a product :
            </Link>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                  <LinkContainer to={`/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </>
  )
}

export default MyProductsScreen
