import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import DeliveryMenu from '../components/DeliveryMenu'
import CustomParallax from '../components/CustomParallax'
import home_top from '../assets/home_top.jpg'

const MenuScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <React.Fragment>
        <CustomParallax title='Deliveries' img={home_top} height={200} />

        <DeliveryMenu className='Delivery' />
        <Paginate
          page={page}
          pages={pages}
          link1={`search/${keyword}`}
          link2={`menu`}
        ></Paginate>
      </React.Fragment>
    </>
  )
}

export default MenuScreen
/*

*/
