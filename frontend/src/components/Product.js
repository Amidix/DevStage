import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import Price from 'react-price'

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 p-3 rounded'
      style={{ alignItems: 'center', justifyContent: 'center', width: 320 }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          style={{ height: 220, width: 220, borderRadius: 4 }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
      <Card.Text as='div'>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>
      <Card.Text as='h3'>
        {product.onSale ? (
          <p>
            <Price cost={product.price} currency='Dh' type='old' />
            <br></br>
            <Price cost={product.salePrice} currency='Dh' />
          </p>
        ) : (
          <p>
            <Price cost={product.price} currency='Dh' />
          </p>
        )}
      </Card.Text>
    </Card>
  )
}

export default Product
