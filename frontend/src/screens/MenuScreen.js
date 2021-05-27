import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listProducts } from '../actions/productActions'
import DeliveryMenu from '../components/DeliveryMenu'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const MenuScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <React.Fragment>
        <CustomParallax title='Deliveries' img={home_top} height={200} />

        <DeliveryMenu className='Delivery' />
      </React.Fragment>
    </>
  )
}

export default MenuScreen
/*

*/
