// import package and local style sheet
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';

import {
  Flex, Box, Tooltip, Image, IconButton,
} from '@chakra-ui/react';


import { 
  RiPagesLine, RiCalendarEventLine, RiLineChartLine,
  RiMusic2Line, RiAccountCircleLine,
  RiLoginBoxLine, RiLogoutBoxLine, 
} from 'react-icons/ri';
import { BiDumbbell } from 'react-icons/bi';

// page navigation bar
function Header() {

  const logout = (event) => {
    event.preventDefault()
    Auth.logout()
  }
  return (
    <div>
      {Auth.loggedIn() ? (
        <nav className='navBar' separator='   '>
          <Flex alignItems='center'>
            <Box width='50vw' display='flex'>
                <Link to='/'>
                  <Tooltip label='Home' bg='var(--shade1)' color='white'>
                    <Image src='./logo.png' alt='Step It Up' width='70px' mr='5' />
                  </Tooltip>
                </Link>
                <Link to='/posts'>
                  <Tooltip label='Blog' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Blog' icon={<RiPagesLine />} />
                  </Tooltip>
                </Link>
                <Link to='/calendar'>
                  <Tooltip label='Calendar' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Calendar' icon={<RiCalendarEventLine />} />
                  </Tooltip>
                </Link>
                <Link to='/tracker'>
                  <Tooltip label='Tracker' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Tracker' icon={<RiLineChartLine />} />
                  </Tooltip>
                </Link>
                <Link to='/routines'>
                  <Tooltip label='Routines' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Routines' icon={<BiDumbbell />} />
                  </Tooltip>
                </Link>
                <Link to='/playlists'>
                  <Tooltip label='Playlists' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Playlists' icon={<RiMusic2Line />} />
                  </Tooltip>
                </Link>
            </Box>
            <Box width='50vw' textAlign='end' pr='5'>
                <Link to='/profile'>
                  <Tooltip label='Profile' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Profile' icon={<RiAccountCircleLine />} />
                  </Tooltip>
                </Link>
                <Tooltip label='Logout' bg='var(--shade1)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Profile' icon={<RiLogoutBoxLine />} onClick={logout} />
                </Tooltip>
            </Box>
          </Flex>
        </nav>
      ) : (
        <nav className='navBar' separator='   '>
          <Flex alignItems='center'>
            <Box width='50vw'>
                <Link to='/'>
                  <Tooltip label='Home' bg='var(--shade1)' color='white'>
                    <Image src='./logo.png' alt='Step It Up' width='60px' mr='2' />
                  </Tooltip>
                </Link>
            </Box>
            <Box width='50vw' textAlign='end' pr='5'>
              <Link to='/loginSignup'>
                  <Tooltip label='Login/Signup' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Login' icon={<RiLoginBoxLine />} />
                  </Tooltip>
                </Link>
            </Box>
          </Flex>
        </nav>
      )}
    </div>
  );
}

export default Header;
