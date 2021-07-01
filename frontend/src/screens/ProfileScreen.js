import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Container, Input, Label } from 'reactstrap'
import { Table, Form, Button, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [cinRecto, setCinRecto] = useState('')
  const [cinVerso, setCinVerso] = useState('')

  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState(0)
  const [building, setBuilding] = useState('')
  const [floor, setFloor] = useState('')

  const [image, setImage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user, success: successDetails } = userDetails

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success, loading: loadingUpdate } = userUpdateProfile

  //image
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFileCinRectoHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setCinRecto(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  const uploadFileCinVersoHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setCinVerso(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          firstName,
          lastName,
          email,
          password,
          cinRecto,
          cinVerso,
          image,
          address: { building, city, postalCode, floor, street },
        })
      )
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setCinRecto(user.cinRecto)
        setCinVerso(user.cinVerso)
        setCity(user.address.city)
        setBuilding(user.address.building)
        setFloor(user.address.floor)
        setPostalCode(user.address.postalCode)
        setStreet(user.address.street)
        setImage(user.image)
      }
    }
  }, [dispatch, history, userInfo, user, success, successDetails])

  return (
    <>
      <section className='contact-page register-page'>
        <CustomParallax title='PROFILE' text='' img={home_top} height='30em' />
        <Container>
          <Row>
            <Col sm='12'>
              {message && <Message variant='danger'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {success && <Message variant='success'>Profile Updated</Message>}
              {loading && <Loader />}
              {loadingUpdate && <Loader />}

              <h3>PERSONAL DETAILS</h3>
              <br></br>
              <Form className='theme-form' onSubmit={submitHandler}>
                <Row>
                  <Col md='6'>
                    <Form.Group controlId='firstName'>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter firstName'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='lastName'>
                      <Form.Label>last Name</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md='6'>
                    <Form.Group controlId='name'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md='6'>
                    <Form.Group controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='confirmPassword'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <br></br>
                <h3>VENDOR INFO</h3>
                <br></br>
                <Row>
                  <Col md='12'>
                    <Form.Group controlId='street'>
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter Street'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='floor'>
                      <Form.Label>Floor/Door</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter floor/door'
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='building'>
                      <Form.Label>Building</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter building'
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='city'>
                      <Form.Label>city</Form.Label>
                      <Form.Control
                        type='name'
                        placeholder='Enter city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group controlId='name'>
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md='4'>
                    <Form.Group controlId='image'>
                      <Form.Label>Image</Form.Label>
                      <Form.File
                        id='image-file'
                        label={image ? image.slice(50) : 'Choose File'}
                        custom
                        encType='multipart/form-data'
                        onChange={uploadFileHandler}
                      ></Form.File>
                    </Form.Group>
                  </Col>
                  <Col md='4'>
                    <Form.Group controlId='cinRecto'>
                      <Form.Label>CIN Recto</Form.Label>
                      <Form.File
                        id='Image-file'
                        label={cinRecto ? cinRecto.slice(50) : 'Choose File'}
                        custom
                        encType='multipart/form-data'
                        onChange={uploadFileCinRectoHandler}
                      ></Form.File>
                    </Form.Group>
                  </Col>
                  <Col md='4'>
                    <Form.Group controlId='cinVerso'>
                      <Form.Label>CIN Verso</Form.Label>
                      <Form.File
                        id='Image-file'
                        label={cinVerso ? cinVerso.slice(50) : 'Choose File'}
                        custom
                        encType='multipart/form-data'
                        onChange={uploadFileCinVersoHandler}
                      ></Form.File>
                    </Form.Group>
                  </Col>
                </Row>
                {uploading && <Loader />}
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='contact-page register-page section-b-space'>
        <Container>
          <br></br>
        </Container>
        <CustomParallax
          title='ORDER HISTORY'
          text=''
          img={home_top}
          height='30em'
        />
        <Container>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Container>
      </section>
    </>
  )
}

export default ProfileScreen
