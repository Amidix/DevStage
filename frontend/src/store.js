import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  producDetailsReducer,
  productDeleteReducer,
  productUpdateReducer,
  productCreateReducer,
  productReviewCreateReducer,
  productUpdateCountInStockReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  userProductsListReducer,
  userProductsAndInfoReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListVendorReducer,
  orderListReducer,
} from './reducers/orderReducers'
const reducer = combineReducers({
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  productList: productListReducer,
  productDetails: producDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducer,
  userProductList: userProductsListReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productReviewCreate: productReviewCreateReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  userProductsAndInfo: userProductsAndInfoReducer,
  orderListVendor: orderListVendorReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  productUpdateCountInStock: productUpdateCountInStockReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : []
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  message: false,
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
