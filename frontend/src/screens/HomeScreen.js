import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'
import home_sitting from '../assets/home_sitting.jpg'
import home_kitchen from '../assets/home_kitchen.jpg'
import KitchenNames from "../components/KitchenNames";
import HomeCards from "../components/HomeCards";
import CustomContainer from "../components/CustomContainer";
import ColumnsContainer from "../components/ColumnsContainer";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>    <React.Fragment className='Home'>
    <CustomParallax title='HOME CUISINE' text="Fresh, Homemade, and Local" img={home_top} height='40em'/>
    <CustomContainer/>
    <CustomParallax title='Eat together'
                    text='Every plate achieves that elusive, cuisine-defining balance of sweet, salty, and sour — even dessert.'
                    img={home_sitting} height='30em'/>
    <HomeCards/>
    <ColumnsContainer/>
    <CustomParallax title='the kitchen' img={home_kitchen} height='40em'/>
    <KitchenNames/>
</React.Fragment>
 
    </>
  )
}

export default HomeScreen
/*
<h1>Products</h1>
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
*/