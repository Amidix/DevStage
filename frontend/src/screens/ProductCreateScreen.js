import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [salePrice, setSalePrice] = useState(0)

  const dispatch = useDispatch()

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate

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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/myproducts')
    }
  }, [dispatch, history, successCreate, errorCreate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('sale' + onSale + 'sale price' + salePrice)
    dispatch(
      createProduct(
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        onSale,
        salePrice
      )
    )
  }

  return (
    <>
      <Link to='/myproducts' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {successCreate && (
          <Message variant='success'>Product Created !</Message>
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='onsale'>
            <Form.Check
              type='checkbox'
              label='On Sale'
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          {onSale ? (
            <Form.Group controlId='saleprice'>
              <Form.Label>Sale Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Sale price'
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
          ) : null}

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
          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
