import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import home_top from '../assets/home_top.jpg'
import CustomParallax from '../components/CustomParallax'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <CustomParallax title='PRODUCTS' text='' img={home_top} height='30em' />
      <Container>
        <Row className='align-items-center'>
          <Col></Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price} Dh</td>
                  <td>{product.category}</td>
                  <td>{product.brand} </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Paginate
          page={page}
          pages={pages}
          link2={`admin/productlist`}
        ></Paginate>
      </Container>
    </>
  )
}

export default ProductListScreen
