// import package and local auth
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../utils/auth';

// import mutation
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// import package component and icon
import {
  Box, Button, FormControl, Spinner,
  InputGroup, InputLeftAddon, InputRightElement,
  ModalFooter, ModalBody,
} from '@chakra-ui/react'

import { FiUser, FiMail, FiEyeOff, FiEye } from 'react-icons/fi';

// import local style sheet
import '../styles/LoginSignup.css';

// functional component for the signup tab
const Signup = () => {

  // define the form state, default empty
  const [formState, setFormState] = useState({ username: '', email: '', password: '', });
  // define mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // on username/email/password change
  const handleChange = (event) => {
    const { name, value } = event.target;

    // set the form state to the new values
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // on submitting the form (click submit)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // authenticate user signup, set to redirect to home page
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // navigate to home on page close
  const navigate = useNavigate();
  const returnToHome = () => navigate('/');
  // set state of show password as text
  const [show, setShow] = React.useState(false)

  return (
    <Box>
      {data ? (
        <Box my='10' textAlign='center'>
          <Link to='/'><Spinner /> Signup success! Logging...</Link>
        </Box>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            <FormControl isRequired>
              <InputGroup borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                <InputLeftAddon
                  width='35%'
                  bg='var(--shade5)'
                  color='white'
                >
                  <span style={{ color: 'red', marginRight: '0.5rem' }}>
                    *
                  </span>
                  Username
                </InputLeftAddon>
                <input
                  type='name'
                  name='username'
                  value={formState.name}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                />
                <InputRightElement>
                  <FiUser />
                </InputRightElement>
              </InputGroup>
              <InputGroup my='5' borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                <InputLeftAddon
                  width='35%'
                  bg='var(--shade5)'
                  color='white'
                >
                  <span style={{ color: 'red', marginRight: '0.5rem' }}>
                    *
                  </span>
                  Email
                </InputLeftAddon>
                <input
                  type='email'
                  name='email'
                  value={formState.email}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                />
                <InputRightElement>
                  <FiMail />
                </InputRightElement>
              </InputGroup>
              <InputGroup borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                <InputLeftAddon
                  width='35%'
                  bg='var(--shade5)'
                  color='white'
                >
                  <span style={{ color: 'red', marginRight: '0.5rem' }}>
                    *
                  </span>
                  Password
                </InputLeftAddon>
                <input
                  type={show ? 'text' : 'password'}
                  name='password'
                  value={formState.password}
                  onChange={handleChange}
                  style={{ paddingLeft: '1rem' }}
                />
                <InputRightElement pr='1'>
                  <Button
                    variant='ghost'
                    h='1.75rem'
                    size='sm'
                    p='0'
                    _hover={{ bg: 'var(--shade2)' }}
                    onClick={() => setShow(!show)}
                  >
                    {show ? <FiEye /> : <FiEyeOff />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter
            mt='5'
            pt='7'
            justifyContent='space-between'
            borderTop='1px'
            borderColor='var(--shade2)'
          >
            <Button mr={3} onClick={returnToHome}>
              Close
            </Button>
            <Button
              type='submit'
              bg='var(--shade1)'
              color='white'
              _hover={{ bg: 'var(--shade2)', color: 'var(--shade6)' }}
            >
              Signup
            </Button>
          </ModalFooter>
        </form>
      )}

      {error && (
        <Box m='5' p='3'>
          {error.message}
        </Box>
      )}
    </Box>
  );
}

export default Signup;