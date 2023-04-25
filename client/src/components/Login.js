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

  const [loginFormState, setLoginFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signupFormState, setSignupFormState] = useState({
    newUsername: '',
    newEmail: '',
    newPassword: '',
  });  

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const returnToHome = () => navigate('/');
  const [show, setShow] = React.useState(false)

  const [login, { loginData }] = useMutation(LOGIN_USER);
  const [addUser, { signupData }] = useMutation(ADD_USER);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupFormState({
      ...signupFormState,
      [name]: value,
    })
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    console.log(loginFormState);

    try {
      const { loginData } = await login({
        variables: { ...loginFormState },
      });

      Auth.login(loginData.login.token);
      returnToHome();
    } catch (e) {
      console.error(e);
    }

    setLoginFormState({
      email: '',
      password: '',
    });
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    console.log(signupFormState);

    try {
      const { signupData } = await addUser({
        variables: { ...signupFormState },
      });

      Auth.login(signupData.addUser.token);
      returnToHome();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className="login-modal">
      <Modal isOpen={isOpen} onClose={returnToHome}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant="enclosed">
            <ModalHeader>
              <TabList mr="10">
                <Tab
                  _selected={{
                    color: "var(--shade6)",
                    bg: "var(--shade2)",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Tab>
                <Tab
                  _selected={{
                    color: "var(--shade6)",
                    bg: "var(--shade2)",
                    fontWeight: "bold",
                  }}
                >
                  Signup
                </Tab>
              </TabList>
            </ModalHeader>
            <ModalCloseButton />
            <TabPanels>
              <TabPanel>
                <form onSubmit={handleLoginFormSubmit}>
                  <ModalBody>
                    <FormControl isRequired>
                      <InputGroup mb="5">
                        <InputLeftAddon
                          width="35%"
                          bg="var(--shade5)"
                          color="white"
                        >
                          <span style={{ color: "red", marginRight: "0.5rem" }}>
                            *
                          </span>
                          Email
                        </InputLeftAddon>
                        <input
                          type="email"
                          name="email"
                          id="login-email"
                          value={loginFormState.email}
                          onChange={handleLoginChange}
                        />
                        <InputRightElement>
                          <FiMail />
                        </InputRightElement>
                      </InputGroup>
                      <InputGroup>
                        <InputLeftAddon
                          width="35%"
                          bg="var(--shade5)"
                          color="white"
                        >
                          <span style={{ color: "red", marginRight: "0.5rem" }}>
                            *
                          </span>
                          Password
                        </InputLeftAddon>
                        <input
                          type={show ? "text" : "password"}
                          name="password"
                          id="login-password"
                          value={loginFormState.password}
                          onChange={handleLoginChange}
                        />
                        <InputRightElement pr="1">
                          <Button
                            variant="ghost"
                            h="1.75rem"
                            size="sm"
                            p="0"
                            _hover={{ bg: "var(--shade2)" }}
                            onClick={() => setShow(!show)}
                          >
                            {show ? <FiUnlock /> : <FiLock />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter
                    mt="5"
                    pt="7"
                    justifyContent="space-between"
                    borderTop="1px"
                    borderColor="var(--shade2)"
                  >
                    <Button mr={3} onClick={returnToHome}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      bg="var(--shade1)"
                      color="white"
                      _hover={{ bg: "var(--shade2)", color: "var(--shade6)" }}
                    >
                      Login
                    </Button>
                  </ModalFooter>
                </form>
              </TabPanel>
              <TabPanel>
                <form onSubmit={handleSignupFormSubmit}>
                  <ModalBody>
                    <FormControl isRequired>
                      <InputGroup>
                        <InputLeftAddon
                          width="35%"
                          bg="var(--shade5)"
                          color="white"
                        >
                          <span style={{ color: "red", marginRight: "0.5rem" }}>
                            *
                          </span>
                          Username
                        </InputLeftAddon>
                        <input
                          type="name"
                          name="newUsername"
                          value={signupFormState.username}
                          id="signup-username"
                          onChange={handleSignupChange}
                        />
                        <InputRightElement>
                          <FiUser />
                        </InputRightElement>
                      </InputGroup>
                      <InputGroup my="5">
                        <InputLeftAddon
                          width="35%"
                          bg="var(--shade5)"
                          color="white"
                        >
                          <span style={{ color: "red", marginRight: "0.5rem" }}>
                            *
                          </span>
                          Email
                        </InputLeftAddon>
                        <input
                          type="email"
                          name="newEmail"
                          value={signupFormState.email}
                          id="signup-email"
                          onChange={handleSignupChange}
                        />
                        <InputRightElement>
                          <FiMail />
                        </InputRightElement>
                      </InputGroup>
                      <InputGroup>
                        <InputLeftAddon
                          width="35%"
                          bg="var(--shade5)"
                          color="white"
                        >
                          <span style={{ color: "red", marginRight: "0.5rem" }}>
                            *
                          </span>
                          Password
                        </InputLeftAddon>
                        <input
                          type={show ? "text" : "password"}
                          name="newPassword"
                          value={signupFormState.password}
                          id="signup-password"
                          onChange={handleSignupChange}
                        />
                        <InputRightElement pr="1">
                          <Button
                            variant="ghost"
                            h="1.75rem"
                            size="sm"
                            p="0"
                            _hover={{ bg: "var(--shade2)" }}
                            onClick={() => setShow(!show)}
                          >
                            {show ? <FiUnlock /> : <FiLock />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter
                    mt="5"
                    pt="7"
                    justifyContent="space-between"
                    borderTop="1px"
                    borderColor="var(--shade2)"
                  >
                    <Button mr={3} onClick={returnToHome}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      bg="var(--shade1)"
                      color="white"
                      _hover={{ bg: "var(--shade2)", color: "var(--shade6)" }}
                    >
                      Signup
                    </Button>
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