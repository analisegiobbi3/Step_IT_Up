// import package and local style sheet
import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/NavBar.css';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import Auth from ''

// page navigation bar
function Header() {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div>
      {Auth.loggedIn()?(
        <Breadcrumb className='navBar' separator='   '>
          <BreadcrumbItem>
            <Link to='/'>
              <h2>Home</h2>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/posts'>
              <h2>Blog</h2>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/calendar'>
              <h2>Calendar</h2>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/profile'>
              <h2>Profile</h2>
            </Link>
          </BreadcrumbItem>
          <button onClick={logout}>Logout</button>
        </Breadcrumb>
      ):(
        <Breadcrumb className='navBar' separator='   '>
          <BreadcrumbItem>
            <Link to='/login'>
              <h2>Login</h2>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to='/signup'>
              <h2>Signup</h2>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
    </div> 
  );
}

export default Header();
