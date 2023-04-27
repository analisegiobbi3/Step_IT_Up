// import package and local style sheet
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client';
import { ADD_USER } from "../utils/mutations";

import Auth from '../utils/auth';

import {
  Box, Button, FormControl,
  InputGroup, InputLeftAddon, InputRightElement,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react'

import { FiUser, FiMail, FiLock, FiUnlock } from "react-icons/fi";

import '../styles/LoginSignup.css';

const Signup = () => {

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const returnToHome = () => navigate('/');
  const redirectLogin = () => navigate('/login');
  const [show, setShow] = React.useState(false)

  return (
    <Box className="signup-modal">
      <Modal isOpen={isOpen} onClose={returnToHome}>
        <ModalOverlay />
        <ModalContent>
          <Tabs isFitted variant="enclosed" defaultIndex={1}>
            <ModalHeader>
              <TabList mr="10">
                <Tab
                  _selected={{
                    color: "var(--shade6)",
                    bg: "var(--shade2)",
                    fontWeight: "bold",
                  }}
                  onClick={redirectLogin}
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

              </TabPanel>
              <TabPanel>
                {data ? (
                  <p>
                    Success! You may now head{" "}
                    <Link to="/">back to the homepage.</Link>
                  </p>
                ) : (
                  <form onSubmit={handleFormSubmit}>
                    <ModalBody>
                      <FormControl isRequired>
                        <InputGroup borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                          <InputLeftAddon
                            width="35%"
                            bg="var(--shade5)"
                            color="white"
                            mr='3'
                          >
                            <span style={{ color: "red", marginRight: "0.5rem" }}>
                              *
                            </span>
                            Username
                          </InputLeftAddon>
                          <input
                            type="name"
                            name="username"
                            // id="signup-username"
                            value={formState.name}
                            onChange={handleChange}
                          />
                          <InputRightElement>
                            <FiUser />
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup my="5" borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                          <InputLeftAddon
                            width="35%"
                            bg="var(--shade5)"
                            color="white"
                            mr='3'
                          >
                            <span style={{ color: "red", marginRight: "0.5rem" }}>
                              *
                            </span>
                            Email
                          </InputLeftAddon>
                          <input
                            type="email"
                            name="email"
                            // id="signup-email"
                            value={formState.email}
                            onChange={handleChange}
                          />
                          <InputRightElement>
                            <FiMail />
                          </InputRightElement>
                        </InputGroup>
                        <InputGroup borderWidth='1px' borderColor='var(--shade5)' borderRadius='10'>
                          <InputLeftAddon
                            width="35%"
                            bg="var(--shade5)"
                            color="white"
                            mr='3'
                          >
                            <span style={{ color: "red", marginRight: "0.5rem" }}>
                              *
                            </span>
                            Password
                          </InputLeftAddon>
                          <input
                            type={show ? "text" : "password"}
                            name="password"
                            // id="signup-password"
                            value={formState.password}
                            onChange={handleChange}
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
                )}

                {error && (
                  <Box className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Signup;