// import package and local style sheet
import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../styles/Header.css';

import {
  Flex, Box, Tooltip, Image, IconButton,
} from '@chakra-ui/react';


import { ImCalendar, ImStatsBars2, ImList } from "react-icons/im";
import { BiMessageDetail, BiLogIn, BiLogOut } from "react-icons/bi";
import { BsPersonCircle, BsMusicPlayerFill } from "react-icons/bs";

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
                    <Image src='./logo.png' alt='Step It Up' width='60px' mr='2' />
                  </Tooltip>
                </Link>
                <Link to='/blog'>
                  <Tooltip label='Blog' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Home' icon={<BiMessageDetail />} />
                  </Tooltip>
                </Link>
                <Link to='/calendar'>
                  <Tooltip label='Calendar' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Calendar' icon={<ImCalendar />} />
                  </Tooltip>
                </Link>
                <Link to='/tracker'>
                  <Tooltip label='Tracker' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Tracker' icon={<ImStatsBars2 />} />
                  </Tooltip>
                </Link>
                <Link to='/routine'>
                  <Tooltip label='Routine' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Routine' icon={<ImList />} />
                  </Tooltip>
                </Link>
                <Link to='/playlists'>
                  <Tooltip label='Playlists' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Playlists' icon={<BsMusicPlayerFill />} />
                  </Tooltip>
                </Link>
            </Box>
            <Box width='50vw' textAlign='end' pr='5'>
                <Link to='/profile'>
                  <Tooltip label='Profile' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Profile' icon={<BsPersonCircle />} />
                  </Tooltip>
                </Link>
                <Tooltip label='Logout' bg='var(--shade1)' color='white'>
                  <IconButton variant='link' px='3' aria-label='Profile' icon={<BiLogOut />} onClick={logout} />
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
              <Link to='/login'>
                  <Tooltip label='Login/Signup' bg='var(--shade1)' color='white'>
                    <IconButton variant='link' px='3' aria-label='Login' icon={<BiLogIn />} />
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
