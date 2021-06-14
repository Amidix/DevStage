import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import DeliveryCard from './DeliveryCard'
import { connect } from 'react-redux'
import { Form, FormControl, Button, Card } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Message from '../components/Message.js'
import Loader from './Loader'
import pizza from '../assets/pizza.png'
import pizzaColor from '../assets/pizzaColor.png'
import pasta from '../assets/ravioli.png'
import chicken from '../assets/chicken-leg.png'

import hamburger from '../assets/hamburger.png'
import fork from '../assets/fork.png'
import sweets from '../assets/cake.png'

const DeliveryMenu = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const cart = useSelector((state) => state.cart)
  const { message } = cart
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
            : item.category.toUpperCase().includes(category)
        )
        .map((item) => cardRender(item))
    }
  }

  /*  const itemsIterate = () => {
        return Object.values(products)
        .filter(item =>
             (item.name.toUpperCase().includes(state.search) || item.description.toUpperCase().includes(state.search) || item.price.toUpperCase().includes(state.search))
           .map(item =>cardRender(item))
    };*/

  const cardRender = (product) => (
    <DeliveryCard
      img={product.image}
      title={product.name}
      price={product.price}
      description={product.description}
      num={product.qty}
      id={product._id}
    />
  )

  const appetizer = itemsIterate(category)

  return (
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
      {message ? (
        <Message>You cant add meals from different chefs</Message>
      ) : (
        ''
      )}
      <div className='filters'>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('')}
        >
          <Card.Img src={fork} className='filters__filter__icon' />{' '}
          <h2 className='filters__filter__title'>All</h2>
        </Button>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('BURGER')}
        >
          <Card.Img src={hamburger} className='filters__filter__icon' />{' '}
          <h2 className='filters__filter__title'>Burger</h2>
        </Button>

        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('PIZZA')}
        >
          <Card.Img
            src={category === 'PIZZA' ? pizzaColor : pizza}
            className='filters__filter__icon'
          />{' '}
          <h2
            className='filters__filter__title'
            style={{ fontWeight: category === 'PIZZA' ? 'bold' : '' }}
          >
            Pizza
          </h2>
        </Button>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('SWEETS')}
        >
          <Card.Img src={sweets} className='filters__filter__icon' />{' '}
          <h2 className='filters__filter__title'>Sweets</h2>
        </Button>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('PASTA')}
        >
          <Card.Img src={pasta} className='filters__filter__icon' />{' '}
          <h2 className='filters__filter__title'>Pasta</h2>
        </Button>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setCategory('CHICKEN')}
        >
          <Card.Img src={chicken} className='filters__filter__icon' />{' '}
          <h2 className='filters__filter__title'>Chicken</h2>
        </Button>
      </div>
      <Row className='pb-3'>{appetizer}</Row>
      {appetizer.length === 0 && (
        <div className='text-center mt-5'>
          <h4>Your search didn't match any item</h4>
        </div>
      )}
    </Container>
  )
}

export default DeliveryMenu
