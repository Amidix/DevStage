import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Container } from 'react-bootstrap'
import { userProductsAndInfo } from '../actions/userActions'
import CustomParallax from '../components/CustomParallax'
import home_top from "../assets/home_top.jpg";

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

  const produc = loading? null: products[0]

  return (
    <>
     <React.Fragment >
            <CustomParallax title='My products' img={home_top} height={200}/>
     </React.Fragment>
      <div>
        <div   >
          <div className='row' style={{alignItems:'center',justifyContent:'center',borderRadius:150}}>
            <div >
              <div  style={{flexDirection:'row'}}>
                <div  >
                  <img
                    src={produc && produc.user.image}
                    className='card-img-top'
                    style={{alignItems:'center',justifyContent:'center',borderRadius:150,height:160,width:160,marginBottom:18 }}
                    alt=''
                  />
                </div>
                <div  style={{marginLeft:200,marginTop:-150,marginBottom:50}}  >
                <h5 className='card-title'>{produc && produc.user.name}</h5>
                <p className='card-text' >
                  {produc && produc.user.email}
                  <br />
                  <td >
                    {produc && produc.user.isVerified ? (
                      <i className='fas fa-check' style={{ color: 'green',marginTop:30 }}>
                        {' '}
                        Verified
                      </i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red',marginTop:30 }}>
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
        </div>

        <Container>
       
          

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div>
              <Row style={{marginLeft:30}}>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default UserProductsAndInfoScreen
