import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import home_top from '../assets/home_top.jpg'
import CustomParallax from '../components/CustomParallax'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
  Form,
  Container,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CustomButtonGroup from '../components/CustomButtonGroup'
import {
  listProductsDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { message } = cart

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submited!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductsDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const submitHandler = (e) => {
    e.preventDefault()
    if (comment) {
      dispatch(
        createProductReview(match.params.id, {
          rating,
          comment,
        })
      )
    }
  }

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
      <CustomParallax
        title='Product Details'
        text=''
        img={home_top}
        height='30em'
      />
      <Container>
        <Link className='btn btn-light my-3' to='/menu'>
          Go Back
        </Link>{' '}
        {message ? (
          <Message>You cant add meals from different chefs</Message>
        ) : (
          ''
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{ height: 400, width: 400 }}
                ></Image>
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Chef :{' '}
                    <Link to={`/profile/${product.user && product.user._id}`}>
                      {product.user && product.user.name}
                    </Link>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: {product.price} Dh</ListGroup.Item>
                  <ListGroup.Item>
                    Description : {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong>{product.price} Dh</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item align='center'>
                    {' '}
                    {product.countInStock > 0 && (
                      <CustomButtonGroup id={product._id} />
                    )}
                  </ListGroup.Item>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <br></br>

                <h2>Reviews</h2>

                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating}></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a Customer Review</h2>
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='warning'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  )
}

export default ProductScreen
