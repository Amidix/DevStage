import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import HoverPopup from './HoverPopup'
import { Link } from 'react-router-dom'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    handleCollapse()
    dispatch(logout())
  }

  const handleCollapse = async (e) => {
    try {
      if (window.innerWidth < 1200) {
        let toggle = await document.getElementsByClassName('navbar-toggler')[0]
        toggle.click()
      }
    } catch (e) {}
  }
  const login = userInfo ? (
    <Nav>
      <Nav.Link className='my-auto'>
        <Link to='/' onClick={logoutHandler} className='text-secondary'>
          Logout
        </Link>
      </Nav.Link>
      {userInfo && userInfo.isVerified && (
        <NavDropdown title='vendor' id='username'>
          <LinkContainer to='/myproducts'>
            <NavDropdown.Item>My Products</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to='/vendororders'>
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      )}
    </Nav>
  ) : (
    <LinkContainer to='/login'>
      <Nav.Link>
        <i className='fas fa-user'></i> Sign in
      </Nav.Link>
    </LinkContainer>
  )

  return (
    <Navbar
      inline
      collapseOnSelect
      className='my-auto text-uppercase shadow py-1'
      expand='lg'
      bg='white'
      sticky='top'
    >
      <Navbar.Brand className='nav-link pl-0 ml-md-5 pl-md-5 font-weight-bold'>
        <Link to='/' className='text-dark'>
          Site Name
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='h6 text-dark w-100'>
          <Nav.Link className='my-auto'>
            <Link
              to='/menu'
              onClick={handleCollapse}
              className='text-secondary'
            >
              Deliveries
            </Link>
          </Nav.Link>
          <Nav.Link className='my-auto'>
            <Link
              to='/profile'
              onClick={handleCollapse}
              className='text-secondary'
            >
              Profile
            </Link>
          </Nav.Link>

          {userInfo && userInfo.isAdmin && (
            <Nav.Link className='my-auto'>
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
            </Nav.Link>
          )}

          {window.innerWidth < 1200 ? (
            <div className='position-absolute sticky-top align-self-end navbar-text text-capitalize text-muted py-2 my-1'>
              {login}
            </div>
          ) : (
            <div className='ml-md-auto mr-md-3 my-auto navbar-text text-capitalize text-muted '>
              {login}
            </div>
          )}
        </Nav>
      </Navbar.Collapse>

      <Nav className='ml-auto mr-sm-5 pr-sm-5 my-0'>
        <Nav.Link className='my-auto text-dark mr-sm-5 pr-sm-5 py-1'>
          <HoverPopup />
        </Nav.Link>
      </Nav>

      <Navbar.Toggle className='ml-2' />
    </Navbar>
  )
}

export default Header
/*import React from 'react'
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
  <header>
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
              <LinkContainer to='/menu'>
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
    </header>


       
        

</>
  
  )
}

export default Header
 */
