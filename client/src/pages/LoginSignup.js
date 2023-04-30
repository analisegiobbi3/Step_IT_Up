// import package and local style sheet
import React from 'react';
import { useNavigate } from 'react-router-dom'

import Login from '../components/Login';
import Signup from '../components/Signup';

import {
  Box, Tabs, TabList, TabPanels, Tab, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'

import '../styles/Routine.css';

const LoginSignup = () => {

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const returnToHome = () => navigate('/');

  return (
    <Box className='loginSignup-modal'>
      <Modal isOpen={isOpen} onClose={returnToHome}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant='enclosed' defaultIndex={0}>
            <ModalHeader>
              <TabList mr='10'>
                <Tab
                  _selected={{
                    color: 'var(--shade6)',
                    bg: 'var(--shade2)',
                    fontWeight: 'bold',
                  }}
                >Login</Tab>
                <Tab
                  _selected={{
                    color: 'var(--shade6)',
                    bg: 'var(--shade2)',
                    fontWeight: 'bold',
                  }}
                >Signup</Tab>
              </TabList>
            </ModalHeader>
            <ModalCloseButton />
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default LoginSignup;