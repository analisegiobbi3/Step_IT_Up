// import package and local style sheet
import React from 'react';
import { Link } from 'react-router-dom'
import Auth from '../utils/auth'
import '../styles/Header.css';

import {
  Flex, Box, Spacer, Tooltip,
  Breadcrumb, BreadcrumbItem, IconButton
} from '@chakra-ui/react';


import { ImHome, ImCalendar, ImStatsBars2, ImList, ImExit } from "react-icons/im";
import { BiMessageDetail } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

// page navigation bar
function Header() {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div>
      {/* {Auth.loggedIn()?( */}
      <Breadcrumb className='navBar' separator='   '>
        <Flex>
          <Box width='50vw'>
            <BreadcrumbItem>
              <Link to='/'>
                <Tooltip label='Home' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' pr='3' aria-label='Home' icon={<ImHome />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/posts'>
                <Tooltip label='Blog' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Home' icon={<BiMessageDetail />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/calendar'>
                <Tooltip label='Calendar' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Calendar' icon={<ImCalendar />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/tracker'>
                <Tooltip label='Tracker' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Tracker' icon={<ImStatsBars2 />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to='/routine'>
                <Tooltip label='Routine' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Routine' icon={<ImList />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
          </Box>
          <Spacer />
          <Box width='50vw' textAlign='end' pr='5'>
            <BreadcrumbItem>
              <Link to='/profile'>
                <Tooltip label='Profile' bg='var(--shade2)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Profile' icon={<BsPersonCircle />} />
                </Tooltip>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Tooltip label='Logout' bg='var(--shade2)' color='white'>
                <IconButton variant='link' px='3' aria-label='Profile' icon={<ImExit />} onClick={logout} />
              </Tooltip>
            </BreadcrumbItem>
          </Box>
        </Flex>
      </Breadcrumb>

      {/* ):(
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
      )} */}
    </div>
  );
}

export default Header;
