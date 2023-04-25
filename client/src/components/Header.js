// import package and local style sheet
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';

import {
  Flex, Box, Spacer, Tooltip, Image, IconButton,
  Breadcrumb, BreadcrumbItem, BreadcrumbSeparator,
} from '@chakra-ui/react';


import { ImCalendar, ImStatsBars2, ImList } from "react-icons/im";
import { BiMessageDetail, BiLogIn, BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";

// page navigation bar
function Header() {
  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div>
      {Auth.loggedIn() ? (
        <Breadcrumb className='navBar' separator='   '>
          <Flex alignItems='center'>
            <Box width='50vw'>
              <BreadcrumbItem>
                <Link to='/'>
                  <Tooltip label='Home' bg='var(--shade1)' color='white'>
                    <Image src='./logo.png' alt='Step It Up' width='60px' mr='2' />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='/blog'>
                  <Tooltip label='Blog' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Home' icon={<BiMessageDetail />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='/calendar'>
                  <Tooltip label='Calendar' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Calendar' icon={<ImCalendar />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='/tracker'>
                  <Tooltip label='Tracker' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Tracker' icon={<ImStatsBars2 />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link to='/routine'>
                  <Tooltip label='Routine' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Routine' icon={<ImList />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
            </Box>
            <Spacer />
            <Box width='50vw' textAlign='end' pr='5'>
              <BreadcrumbItem>
                <Link to='/profile'>
                  <Tooltip label='Profile' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Profile' icon={<BsPersonCircle />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Tooltip label='Logout' bg='var(--shade1)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Profile' icon={<BiLogOut />} onClick={logout} />
                </Tooltip>
              </BreadcrumbItem>
            </Box>
          </Flex>
        </Breadcrumb>
      ) : (
        <Breadcrumb className='navBar' separator='   '>
          <Flex alignItems='center'>
            <Box width='50vw'>
              <BreadcrumbItem>
                <Link to='/'>
                  <Tooltip label='Home' bg='var(--shade1)' color='white'>
                    <Image src='./logo.png' alt='Step It Up' width='60px' mr='2' />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
            </Box>
            <Spacer />
            <Box width='50vw' textAlign='end' pr='5'>
              <BreadcrumbItem>
              <Link to='/login'>
                  <Tooltip label='Login/Signup' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Login' icon={<BiLogIn />} />
                  </Tooltip>
                </Link>
              </BreadcrumbItem>
            </Box>
          </Flex>
        </Breadcrumb>
      )}
    </div>
  );
}

export default Header;
