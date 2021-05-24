import React from 'react';
import CustomParallax from "../components/CustomParallax";
import home_top from "../assets/home_top.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import CartTableItem from "../components/CartTableItem";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import CartTotalsCart from "../components/CartTotalsCart";
import { useDispatch, useSelector } from 'react-redux'

const CartScreen = () => {

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    
    const cartTableItemRender = (title) => <CartTableItem product={title.product} image={title.image} name={title.name}
                                                          price={title.price} qty={title.qty} countInStock={title.countInStock}/>;

    const full = <Row>
        <Col xs={12} lg={8}>
            <div className='d-flex'>
                <h4 className='text-uppercase mr-2 my-auto'>My Cart</h4>
                <p className='my-auto'>({cartItems.reduce((acc, item) => acc + item.qty, 0)} Products)</p>
            </div>
            <Table className='mt-3' responsive>
                <thead>
                <tr className='text-center'>
                    <th/>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                {Object.values(cartItems).map(title =>
                                (title.qty > 0) && cartTableItemRender(title) 
                            )}
                </tbody>
            </Table>
        </Col>

        <Col className='ml-lg-5 pl-lg-2 mt-4 mt-lg-0' xs={12} lg={3}>
            <CartTotalsCart disabled={false} buttonText='Checkout' total={cartItems.reduce((acc, item) => acc + item.qty, 0)} totalPrice= {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}/>
        </Col>
    </Row>;
    const empty = <div className='text-center'>
        <h2>
            Your cart is currently empty...
        </h2>
        <Link to='/menu'>
            <Button variant='warning' className='mt-4'>
                Back to Deliveries
            </Button>
        </Link>
    </div>;

    return (
        <React.Fragment>
            <CustomParallax title='Cart' img={home_top} height={300}/>
            <Container className='my-auto Cart'>
                {cartItems.reduce((acc, item) => acc + item.qty, 0) > 0 ? (full) : (empty)}
            </Container>
        </React.Fragment>
    );
}



export default CartScreen

/*import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message style={{color:'blue'}}>
            Your cart is empty<Link to='/'> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.namee}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash' />{' '}
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen*/
