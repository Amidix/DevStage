import React, { useEffect } from 'react'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Row, Col, Container } from 'react-bootstrap'
import { userProductsAndInfo } from '../actions/userActions'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

import { Component } from 'react'
import DeliveryCard from '../components/DeliveryCard'
import { Form, FormControl, Button } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDispatch, useSelector } from 'react-redux'
import pizza from '../assets/pizza.png'
import { useState } from 'react'

import pizzaColor from '../assets/pizzaColor.png'
import pasta from '../assets/ravioli.png'
import pastaColor from '../assets/ravioliColor.png'
import chicken from '../assets/chicken-leg.png'
import chickenColor from '../assets/chicken-legColor.png'
import FilterBox from '../components/FilterBox.js'
import hamburger from '../assets/hamburger.png'
import hamburgerColor from '../assets/hamburgerColor.png'
import fork from '../assets/fork.png'
import forkColor from '../assets/forkColor.png'
import sweet from '../assets/cake.png'
import sweetColor from '../assets/cakeColor.png'
import sandwich from '../assets/sandwich.png'
import sandwichColor from '../assets/sandwichColor.png'
import barbecue from '../assets/barbecue.png'
import barbecueColor from '../assets/barbecueColor.png'
import crepe from '../assets/crepe.png'
import crepeColor from '../assets/crepeColor.png'
import tajine from '../assets/tajine.png'
import tajineColor from '../assets/tajineColor.png'
import taco from '../assets/taco.png'
import tacoColor from '../assets/tacoColor.png'

const UserProductsAndInfoScreen = ({ history, match }) => {
  const userId = match.params.id

  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const userProductsAndInfoo = useSelector((state) => state.userProductsAndInfo)
  const { loading, error, products } = userProductsAndInfoo
  const cart = useSelector((state) => state.cart)
  const { message } = cart
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const cardRender = (product) => (
    <DeliveryCard
      img={product.image}
      title={product.name}
      price={product.price}
      description={product.description}
      num={product.qty}
      id={product._id}
      chef={product.user && product.user.name}
      chefId={product.user && product.user._id}
      countInStock={product.countInStock}
    />
  )
  const handleChange = (e) => {
    setSearch(e.target.value.toUpperCase())
  }
  const itemsIterate = (category) => {
    if (products != null) {
      return Object.values(products)
        .filter((item) =>
          category === ''
            ? item.name.toUpperCase().includes(search) ||
              item.description.toUpperCase().includes(search) ||
              item.price.toString().toUpperCase().includes(search)
            : item.category.toUpperCase().includes(category) ||
              item.name.toUpperCase().includes(category)
        )
        .map((item) => cardRender(item))
    }
  }
  const appetizer = itemsIterate(category)

  useEffect(() => {
    dispatch(userProductsAndInfo(userId))
  }, [dispatch, history, userInfo, successDelete])

  const produc = loading ? null : products[0]

  return (
    <>
      <React.Fragment>
        <CustomParallax title='My products' img={home_top} height={200} />
      </React.Fragment>
      <div>
        <div>
          <div
            className='row'
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 150,
            }}
          >
            <div>
              <div style={{ flexDirection: 'row' }}>
                <div>
                  <img
                    src={produc && produc.user.image}
                    className='card-img-top'
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 150,
                      height: 160,
                      width: 160,
                      marginBottom: 18,
                    }}
                    alt=''
                  />
                </div>
                <div
                  style={{ marginLeft: 200, marginTop: -150, marginBottom: 50 }}
                >
                  <h5 className='card-title'>{produc && produc.user.name}</h5>
                  <p className='card-text'>
                    {produc && produc.user.email}
                    <br />
                    <td>
                      {produc && produc.user.isVerified ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green', marginTop: 30 }}
                        >
                          {' '}
                          Verified
                        </i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red', marginTop: 30 }}
                        >
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
              <Container className='Delivery'>
                <Form className='justify-content-center' inline>
                  <InputGroup style={{ width: '50%' }}>
                    <FormControl
                      onChange={handleChange}
                      type='text'
                      placeholder='Search items'
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id='inputGroupPrepend'>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>

                <h1 className='pt-5 mx-auto'>Menu</h1>

                <div className='filters'>
                  <FilterBox
                    category={category}
                    filter=''
                    onClick={() => setCategory('')}
                    logo={fork}
                    logoColor={forkColor}
                    filterName='All'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='BURGER'
                    onClick={() => setCategory('BURGER')}
                    logo={hamburger}
                    logoColor={hamburgerColor}
                    filterName='Burgers'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='PIZZA'
                    onClick={() => setCategory('PIZZA')}
                    logo={pizza}
                    logoColor={pizzaColor}
                    filterName='Pizza'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='SWEETS'
                    onClick={() => setCategory('SWEETS')}
                    logo={sweet}
                    logoColor={sweetColor}
                    filterName='Sweets'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='PASTA'
                    onClick={() => setCategory('PASTA')}
                    logo={pasta}
                    logoColor={pastaColor}
                    filterName='Pasta'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='CHICKEN'
                    logo={chicken}
                    logoColor={chickenColor}
                    onClick={() => setCategory('CHICKEN')}
                    filterName='Chicken'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='SANDWICH'
                    onClick={() => setCategory('SANDWICH')}
                    logo={sandwich}
                    logoColor={sandwichColor}
                    filterName='Sandwich'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='BARBECUE'
                    onClick={() => setCategory('BARBECUE')}
                    logo={barbecue}
                    logoColor={barbecueColor}
                    filterName='Barbecue'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='CREPE'
                    onClick={() => setCategory('CREPE')}
                    logo={crepe}
                    logoColor={crepeColor}
                    filterName='Crepe'
                  ></FilterBox>
                  <FilterBox
                    category={category}
                    filter='TRADITIONEL'
                    onClick={() => setCategory('TRADITIONEL')}
                    logo={tajine}
                    logoColor={tajineColor}
                    filterName='Traditionel'
                  ></FilterBox>

                  <br></br>

                  <FilterBox
                    category={category}
                    filter='MEXICAIN'
                    onClick={() => setCategory('MEXICAIN')}
                    logo={taco}
                    logoColor={tacoColor}
                    filterName='Mexicain'
                  ></FilterBox>
                </div>
                {message ? (
                  <Message>You cant add meals from different chefs</Message>
                ) : (
                  ''
                )}
                <Row className='pb-3'>{appetizer}</Row>
                {appetizer.length === 0 && (
                  <div className='text-center mt-5'>
                    <h4>Your search didn't match any item</h4>
                  </div>
                )}
              </Container>
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default UserProductsAndInfoScreen
