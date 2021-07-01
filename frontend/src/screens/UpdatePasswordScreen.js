import React, { useState } from 'react'
import axios from 'axios'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Message from '../components/Message.js'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

const UpdatePassword = ({ match }) => {
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [confirmPassword, setconfirmPassword] = useState('')

  const updatePassword = (e) => {
    e.preventDefault()

    const userId = match.params.userId
    const token = match.params.token

    axios
      .post(`/api/mailing/receive_new_password/${userId}/${token}`, {
        password,
      })
      .then((res) => console.log('RESPONSE FROM SERVER TO CLIENT:', res))
      .catch((err) => setError(true))
    setSubmitted(!submitted)
  }

  return (
    <>
      <CustomParallax
        title='Password Update'
        text=''
        img={home_top}
        height='30em'
      />
      <Container>
        <h3 style={{ paddingBottom: '1.25rem' }}>Update your password</h3>
        {submitted ? (
          !error ? (
            <div>
              <p>Your password has been changed.</p>
              <Link to='/login' className='ghost-btn'>
                Sign back in
              </Link>
            </div>
          ) : (
            <Message variant='danger'>This Link has expired</Message>
          )
        ) : (
          <div>
            <Form
              onSubmit={updatePassword}
              style={{
                width: 400,
              }}
              style={{ paddingBottom: '1.5rem' }}
            >
              <Form.Group>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder='New password'
                  type='password'
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder='Confirm password'
                  type='password'
                />
              </Form.Group>
              <Button
                type='submit'
                variant='warning'
                bsSize='large'
                disabled={password == ''}
              >
                Update password
              </Button>
            </Form>
          </div>
        )}
      </Container>
    </>
  )
}

export default UpdatePassword
