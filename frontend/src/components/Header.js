import React from 'react'
import {Link} from 'react-router-dom'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from '../components/SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
     <>
    <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <title>Food and Restorent One page Template</title>
        <meta name="description" content=""/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>

        <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
        <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href="assets/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="assets/css/bootstrap-theme.min.css"/>


       
        <link rel="stylesheet" href="assets/css/animate/animate.css" />
        <link rel="stylesheet" href="assets/css/plugins.css" />

    
        <link rel="stylesheet" href="assets/css/style.css"/>

        <link rel="stylesheet" href="assets/css/responsive.css" />

        <script src="assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
   </head>
    <header id="home" class="navbar-fixed-top">
  <div class="header_top_menu clearfix">	
      <div class="container">
          <div class="row">	
              <div class="col-md-5 col-md-offset-3 col-sm-12 text-right">
                  <div class="call_us_text">
      <a href=""><i class="fa fa-clock-o"></i> Order Foods 24/7</a>
      <a href=""><i class="fa fa-phone"></i>061 9876 5432</a>
    </div>
              </div>

              <div class="col-md-4 col-sm-12">
                  <div class="head_top_social text-right">
                      <a href=""><i class="fa fa-facebook"></i></a>
                      <a href=""><i class="fa fa-google-plus"></i></a>
                      <a href=""><i class="fa fa-twitter"></i></a>
                      <a href=""><i class="fa fa-linkedin"></i></a>
                      <a href=""><i class="fa fa-pinterest-p"></i></a>
                      <a href=""><i class="fa fa-youtube"></i></a>
                      <a href=""><i class="fa fa-phone"></i></a>
                      <a href=""><i class="fa fa-camera"></i></a>
                  </div>	
              </div>

          </div>			
      </div>
  </div>



  <div class="main_menu_bg">
      <div class="container"> 
          <div class="row">
              <nav class="navbar navbar-default">
                  <div class="container-fluid">
                    
                      <div class="navbar-header">
                          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                              <span class="sr-only">Toggle navigation</span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                              <span class="icon-bar"></span>
                          </button>
                          <a class="navbar-brand our_logo" href="#"><img src="assets/images/logo.png" alt="" /></a>
                      </div>

                  
                      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                          <ul class="nav navbar-nav navbar-right">
                              <li><Link to ='/profile'>profile</Link></li>
                              <li><a href="#abouts">Menu</a></li>
                              <li><a href="#features">Features</a></li>
                              <li><a href="#portfolio">Delivery</a></li>
                              <li><a href="#ourPakeg">News</a></li>
                              <li><a href="#mobaileapps">Pages</a></li>
                              <li><a href="#" class="booking">Table Booking</a></li>
                          </ul>
                      </div>
                  </div>
              </nav>
          </div>
      </div>
  </div>	
</header>


       
        

</>
  
  )
}

export default Header
 /* <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/'>
                <Nav.Link>
                   Products
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/profile'>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
               
              
              {userInfo ? (
                <NavDropdown title='vendor' id='username'>
              
                  <LinkContainer to='/myproducts'>
                    <NavDropdown.Item>My Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}   
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>*/