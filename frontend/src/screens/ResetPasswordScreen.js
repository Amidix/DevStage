import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'
//import styled from 'styled-components'
import { Button } from 'react-bootstrap'
//import RecoverPasswordStyles from './RecoverPassword.styles'
import axios from 'axios'
import { Container, Input } from 'reactstrap'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const sendPasswordResetEmail = (e) => {
    console.log('email' + email)
    e.preventDefault()
    axios.post(`/api/mailing/user/${email}`)

    setEmail('')
    setSubmitted(true)
  }

  return (
    <>
      <CustomParallax
        title='Password Reset'
        text=''
        img={home_top}
        height='30em'
      />
      <Container className='mt-5 pt-3 Login'>
        <h3>Reset your password</h3>
        {submitted ? (
          <div>
            <p>
              If that account is in our system, we emailed you a link to reset
              your password.
            </p>
            <Link to='/login'>Return to sign in</Link>
          </div>
        ) : (
          <div>
            <p>
              To reset your password, enter your email below and submit. An
              email will be sent to you with instructions about how to complete
              the process.
            </p>
            <Form
              onSubmit={sendPasswordResetEmail}
              style={{
                width: 400,
              }}
            >
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleChange}
              ></Form.Control>

              <Button
                block
                variant='warning'
                bsSize='large'
                className='mt-4 '
                type='submit'
              >
                Send password reset email
              </Button>
            </Form>
            <Link className='link' to='/login'>
              I remember my password
            </Link>
          </div>
        )}
      </Container>
    </>
  )
}
export default ResetPassword
