// import package and local style sheet
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@apollo/client';
import { ADD_POST } from "../utils/mutations";

import Auth from '../utils/auth';

import {
  Box, Button, FormControl, Spinner,
  InputGroup, InputLeftAddon,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'

import { FiBookmark } from "react-icons/fi";

import '../styles/CreatePost.css';

const CreatePost = () => {

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const redirectBlog = () => navigate('/posts');
  const [formState, setFormState] = useState({ title: "", text: "" });
  const [addPost, { error, data }] = useMutation(ADD_POST);

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
      const { data } = await addPost({
        variables: { ...formState },
      });

      window.location.assign('/posts');
    } catch (e) {
      console.error(e);
    }

    setFormState({
      title: "",
      text: "",
    });
  };

  return (
    <Box className="login-modal">
      <Modal isOpen={isOpen} onClose={redirectBlog} scrollBehavior='inside' size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Share Something!
          </ModalHeader>
          <ModalCloseButton />
          {data ? (
            <Box m='auto' mb='10'>
              <Link to="/posts"><Spinner /> Posting...</Link>
            </Box>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <ModalBody>
                <FormControl isRequired>
                  <InputGroup mb="5">
                    <InputLeftAddon
                      bg="var(--shade5)"
                      color="white"
                    >
                      <FiBookmark />Post Title
                    </InputLeftAddon>
                    <input
                      type="text"
                      name="title"
                      size='47'
                      value={formState.title}
                      onChange={handleChange}
                      style={{ borderWidth: '1px', borderColor: 'var(--shade6)' }}
                    />
                  </InputGroup>
                  <Box>
                    <textarea
                      type="textarea"
                      name="text"
                      placeholder="post content"
                      rows='5'
                      cols='60'
                      value={formState.text}
                      onChange={handleChange}
                      style={{ borderWidth: '1px', borderColor: 'var(--shade6)' }}
                    />
                  </Box>
                  <Box textAlign='right'>
                    <Button
                      variant="solid"
                      h="1.75rem"
                      size="lg"
                      mt='5'
                      p='5'
                      bg='var(--shade4)'
                      color='white'
                      _hover={{ bg: "var(--shade2)", color: 'var(--shade6)' }}
                    // onClick={}
                    >
                      Add/Share Routine
                    </Button>
                  </Box>
                </FormControl>
              </ModalBody>
              <ModalFooter
                mt="5"
                pt="7"
                justifyContent="space-between"
                borderTop="1px"
                borderColor="var(--shade2)"
              >
                <Button mr={3} onClick={redirectBlog}>
                  Close
                </Button>
                <Button
                  type="submit"
                  bg="var(--shade1)"
                  color="white"
                  _hover={{ bg: "var(--shade2)", color: "var(--shade6)" }}
                >
                  Post It!
                </Button>
              </ModalFooter>
            </form>
          )}

          {error && (
            <Box m='5' p='3'>
              {error.message}
            </Box>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreatePost;