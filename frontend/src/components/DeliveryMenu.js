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
import sale from '../assets/sale.png'
import { Col } from 'react-bootstrap'

const DeliveryMenu = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [onSale, setOnSale] = useState(false)

  const cart = useSelector((state) => state.cart)
  const { message } = cart
  const handleChange = (e) => {
    setSearch(e.target.value.toUpperCase())
  }
  const itemsIterate = (category, onSale) => {
    if (products != null) {
      return Object.values(products)
        .filter((item) =>
          category === '' && onSale === false
            ? item.name.toUpperCase().includes(search) ||
              item.description.toUpperCase().includes(search) ||
              item.price.toString().toUpperCase().includes(search)
            : onSale === true
            ? item.onSale.toString().toUpperCase.includes(true)
            : item.category.toUpperCase().includes(category) ||
              item.name.toUpperCase().includes(category)
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
      chef={product.user && product.user.name}
      chefId={product.user && product.user._id}
      countInStock={product.countInStock}
      onSale={product.onSale}
      salePrice={product.salePrice}
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

      <div>
        <Button
          variant='light'
          className='filters__filter'
          onClick={() => setOnSale(true)}
        >
          <Card.Img
            src={onSale === true ? sale : hamburger}
            className='filters__filter__icon'
          />{' '}
          <h2
            className='filters__filter__title'
            style={{ fontWeight: onSale === true ? 'bold' : '' }}
          >
            On Sale
          </h2>
        </Button>
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
          filter='TRADITIONEL'
          onClick={() => setCategory('TRADITIONEL')}
          logo={tajine}
          logoColor={tajineColor}
          filterName='Traditionel'
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
          filter='PASTA'
          onClick={() => setCategory('PASTA')}
          logo={pasta}
          logoColor={pastaColor}
          filterName='Pasta'
        ></FilterBox>

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
      {loading && <Loader />}
      <Row className='pb-3'>{appetizer}</Row>
      {appetizer && !loading
        ? appetizer.length === 0 && (
            <div className='text-center mt-5'>
              <h4>Your search didn't match any item</h4>
            </div>
          )
        : null}
    </Container>
  )
}

export default DeliveryMenu
