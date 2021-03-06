import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import MenuScreen from './screens/MenuScreen'

import LoginScreen from './screens/LoginScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import MyProductsScreen from './screens/MyProductsScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import UserProductsAndInfoScreen from './screens/UserProductsAndInfoScreen'
import VendorOrdersScreen from './screens/VendorOrdersScreen'
import OrderListScreen from './screens/OrderListScreen'
import ResetPassword from './screens/ResetPasswordScreen'
import UpdatePassword from './screens/UpdatePasswordScreen'
const App = () => {
  return (
    <Router>
      <Header className='Header' />
      <main>
        <Route path='/order/:id' component={OrderScreen} />
        <Route path='/shipping' component={ShippingScreen} />
        <Route path='/payment' component={PaymentScreen} />
        <Route path='/placeorder' component={PlaceOrderScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/resetPassword' component={ResetPassword} />
        <Route
          path='/password/reset/:userId/:token'
          component={UpdatePassword}
        />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/profile' component={ProfileScreen} exact />
        <Route path='/profile/:id' component={UserProductsAndInfoScreen} />
        <Route path='/myproducts' component={MyProductsScreen} />
        <Route path='/vendororders' component={VendorOrdersScreen} exact />
        <Route
          path='/vendororders/page/:pageNumber'
          component={VendorOrdersScreen}
          exact
        />
        <Route path='/createproduct' component={ProductCreateScreen} exact />
        <Route path='/product/:id' component={ProductScreen} exact />
        <Route path='/cart/:id?' component={CartScreen} />
        <Route path='/menu' component={MenuScreen} exact />
        <Route path='/admin/userlist' component={UserListScreen} exact />
        <Route
          path='/admin/userlist/page/:pageNumber'
          component={UserListScreen}
          exact
        />
        <Route path='/admin/user/:id/edit' component={UserEditScreen} />
        <Route
          path='/admin/productlist/page/:pageNumber'
          component={ProductListScreen}
          exact
        />
        <Route path='/admin/productlist' component={ProductListScreen} exact />
        <Route path='/admin/orderlist' component={OrderListScreen} exact />
        <Route
          path='/admin/orderlist/page/:pageNumber'
          component={OrderListScreen}
          exact
        />
        <Route path='/product/:id/edit' component={ProductEditScreen} exact />
        <Route path='/menu/search/:keyword' component={MenuScreen} exact />
        <Route path='/menu/page/:pageNumber' component={MenuScreen} exact />
        <Route
          path='/menu/search/:keyword/page/:pageNumber'
          component={MenuScreen}
          exact
        />

        <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  )
}

export default App
