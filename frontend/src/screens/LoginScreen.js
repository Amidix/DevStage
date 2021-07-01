import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const validateForm = () => {
    return !(email.length > 0 && password.length > 0)
  }

  return (
    <React.Fragment>
      <Container className='mt-5 pt-3 Login'>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Row>
          <Col xs={6} className='border-right'>
            <h3 className='text-center text-uppercase font-weight-bold'>
              Login
            </h3>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Link className='link' to={'/resetPassword'}>
                  Forgot Your password ?
                </Link>
              </Form.Group>
              <Button
                block
                variant='dark'
                type='submit'
                disabled={validateForm()}
              >
                Login
              </Button>
            </Form>
          </Col>

          <Col xs={6}>
            <h3 className='text-center text-uppercase font-weight-bold '>
              New Customer?
            </h3>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              <Form.Label />
              <Button block variant='warning' bsSize='large' className='mt-4'>
                Signup
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default LoginScreen
/*
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Adress</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer ?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen*/
