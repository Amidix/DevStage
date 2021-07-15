import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import CustomButtonGroup from './CustomButtonGroup'
import Price from 'react-price'
import sale from '../assets/sale.png'

export default function DeliveryCard(props) {
  const height =
    window.innerHeight < 1200
      ? window.innerHeight < 400
        ? '10em'
        : '13em'
      : '18em'

  return (
    <Col xs={10} sm={6} md={4} lg={3} className='mx-auto mx-sm-0 mt-4'>
      <Card className='h-100' border='dark'>
        <Card.Body className='py-3'>
          <Card.Title>
            <Row>
              <Col xs={6} className='text-capitalize'>
                {props.title}
              </Col>
              <Col className='text-right px-0'>
                {props.onSale ? (
                  <p className='mx-2 my-0 p-0 text-danger'>
                    <Price cost={props.salePrice} currency='Dh' />
                  </p>
                ) : (
                  <p className='mx-2 my-0 p-0 text-secondary'>
                    <Price cost={props.price} currency='Dh' />
                  </p>
                )}
              </Col>
            </Row>
          </Card.Title>
          <Card.Text className='mb-0 pb-0'>
            {' '}
            Chef :{' '}
            <Link className='link' to={`/profile/${props.chefId}`}>
              {props.chef}
            </Link>
          </Card.Text>
        </Card.Body>
        <Link to={`/product/${props.id}`}>
          <Card.Img
            variant='top'
            style={{ objectFit: 'cover', height: height }}
            src={props.img}
          />
        </Link>
        <CustomButtonGroup id={props.id} cis={props.countInStock} />
      </Card>
    </Col>
  )
}
