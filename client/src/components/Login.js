// import package and local style sheet
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADD_USER } from "../utils/mutations";

import Auth from '../utils/auth';

import {
  Box, Button, FormControl,
  Input, InputGroup, InputLeftAddon, InputRightElement,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react'

import { FiUser, FiMail, FiLock, FiUnlock } from "react-icons/fi";

import '../styles/Login.css';

const Login = () => {

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const returnToHome = () => navigate('/');
  const [show, setShow] = React.useState(false)

  const [login, { LoginData }] = useMutation(LOGIN_USER);
  const [addUser, { signupData }] = useMutation(ADD_USER);

  const [loginState, setLoginState] = useState({ 
    email: '', 
    password: '' 
  });
  
  const [signupState, setSignupState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupState({
      ...signupState,
      [name]: value,
    })
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    console.log(loginState);

    try {
      const { LoginData } = await login({
        variables: { ...loginState },
      });

      Auth.login(LoginData.login.token);
      returnToHome();
    } catch (e) {
      console.error(e);
    }

    setLoginState({
      email: '',
      password: '',
    });
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    console.log(signupState);

    try {
      const { signupData } = await addUser({
        variables: { ...signupState },
      });

      Auth.login(signupData.addUser.token);
      returnToHome();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className='login-modal'>
      <Modal isOpen={isOpen} onClose={returnToHome}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant='enclosed'>
            <ModalHeader>
              <TabList mr='10'>
                <Tab _selected={{ color: 'var(--shade6)', bg: 'var(--shade2)', fontWeight: 'bold' }}>Login</Tab>
                <Tab _selected={{ color: 'var(--shade6)', bg: 'var(--shade2)', fontWeight: 'bold' }}>Signup</Tab>
              </TabList>
            </ModalHeader>
            <ModalCloseButton />
            <TabPanels>
              <TabPanel>
<form>
                  <ModalBody>
                    <FormControl isRequired onSubmit={handleLoginFormSubmit}>
                      <InputGroup mb='5'>
                        <InputLeftAddon width='35%' bg='var(--shade5)' color='white'><span style={{ color: 'red', marginRight: '0.5rem' }}>*</span>Email</InputLeftAddon>
                        <Input type='email' name="email" id='login-email' value={loginState.email} onChange={handleLoginChange} />
                        <InputRightElement><FiMail /></InputRightElement>
                      </InputGroup>
                      <InputGroup>
                        <InputLeftAddon width='35%' bg='var(--shade5)' color='white'><span style={{ color: 'red', marginRight: '0.5rem' }}>*</span>Password</InputLeftAddon>
                        <Input type={show ? 'text' : 'password'} name="password" id='login-password'  value={loginState.password} onChange={handleLoginChange} />
                        <InputRightElement pr='1'>
                          <Button variant='ghost' h='1.75rem' size='sm' p='0' _hover={{ bg: 'var(--shade2)' }} onClick={() => setShow(!show)}>
                            {show ? <FiUnlock /> : <FiLock />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter mt='5' pt='7' justifyContent='space-between' borderTop='1px' borderColor='var(--shade2)'>
                    <Button mr={3} onClick={returnToHome}>Close</Button>
                    <Button type="submit" bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade2)', color: 'var(--shade6)' }}>Login</Button>
                  </ModalFooter>
                  </form>
              </TabPanel>
              <TabPanel>
<form onSubmit={handleSignupFormSubmit}>
                  <ModalBody>
                    <FormControl isRequired>
                      <InputGroup>
                        <InputLeftAddon width='35%' bg='var(--shade5)' color='white'><span style={{ color: 'red', marginRight: '0.5rem' }}>*</span>Username</InputLeftAddon>
                        <Input type='name' name="username" value={signupState.username} id='signup-username' onChange={handleSignupChange} />
                        <InputRightElement><FiUser /></InputRightElement>
                      </InputGroup>
                      <InputGroup my='5'>
                        <InputLeftAddon width='35%' bg='var(--shade5)' color='white'><span style={{ color: 'red', marginRight: '0.5rem' }}>*</span>Email</InputLeftAddon>
                        <Input type='email' name="email" value={signupState.email} id='signup-email' onChange={handleSignupChange} />
                        <InputRightElement><FiMail /></InputRightElement>
                      </InputGroup>
                      <InputGroup>
                        <InputLeftAddon width='35%' bg='var(--shade5)' color='white'><span style={{ color: 'red', marginRight: '0.5rem' }}>*</span>Password</InputLeftAddon>
                        <Input type={show ? 'text' : 'password'} name="password" value={signupState.password} id='signup-password' onChange={handleSignupChange} />
                        <InputRightElement pr='1'>
                          <Button variant='ghost' h='1.75rem' size='sm' p='0' _hover={{ bg: 'var(--shade2)' }} onClick={() => setShow(!show)}>
                            {show ? <FiUnlock /> : <FiLock />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter mt='5' pt='7' justifyContent='space-between' borderTop='1px' borderColor='var(--shade2)'>
                    <Button mr={3} onClick={returnToHome}>Close</Button>
                    <Button type="submit" bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade2)', color: 'var(--shade6)' }}>Signup</Button>
                  </ModalFooter>
                  </form>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>

    </Box>
  );
}

export default Login;