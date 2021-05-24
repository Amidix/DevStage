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
const App = () => {
  return (
    <Router>
      <Header className="Header"/>
      <main>
   
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/profile/:id' component={UserProductsAndInfoScreen} />
          <Route path='/myproducts' component={MyProductsScreen} />
          <Route path='/createproduct' component={ProductCreateScreen} exact />
          <Route path='/product/:id' component={ProductScreen} exact />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/menu' component={MenuScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/product/:id/edit' component={ProductEditScreen} exact />
          <Route path='/search/:keyword' component={MenuScreen} />
          <Route path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
    
  )
}

export default App
