// import packages
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

// import query and mutation
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_POST } from '../utils/mutations';

// import pacakge components and icon
import {
  Box, Button, FormControl, Spinner,
  InputGroup, InputLeftAddon, Portal,
  Menu, MenuButton, MenuList, MenuItem,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'

import { FiBookmark, FiPlus } from 'react-icons/fi';

// functional component of the create post modal
const CreatePost = () => {

  // set modal to open on default
  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  // navigate to posts page on close
  const navigate = useNavigate();
  const redirectBlog = () => navigate('/posts');

  // set the form state, default empty
  const [formState, setFormState] = useState({ title: '', text: '' });

  // query all data associated with the signed in user
  const { loading, data } = useQuery(QUERY_ME)

  // extract the routines from the query data
  const routines = data?.me.routines || [];

  // on click to add routine to post message
  const handleAddRoutine = (index) => {

    // define the current text state
    const currentText = formState.text
    // define the new text and update state
    let newText = currentText + '\n\n' + routines[index].title + ': \n' + routines[index].text
    setFormState({ ...formState, text: newText })
  }

  // on title/text change
  const handleChange = (event) => {
    const { name, value } = event.target;

    // set the form state to the new values
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // define add post mutation
  const [addPost, { error, postData }] = useMutation(ADD_POST);

  // on click (create post button)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      // add post with variables postId and formstates
      const { postData } = await addPost({
        variables: { ...formState },
      });

      // redirect to posts page
      window.location.assign('/posts');
    } catch (e) {
      console.error(e);
    }

    // clear form state
    setFormState({
      title: '',
      text: '',
    });
  };

  return (
    <Box className='login-modal'>
      <Modal isOpen={isOpen} onClose={redirectBlog} scrollBehavior='inside' size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Share Something!
          </ModalHeader>
          <ModalCloseButton />
          {postData ? (
            <Box m='auto' mb='10'>
              <Link to='/posts'><Spinner /> Posting...</Link>
            </Box>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <ModalBody>
                <FormControl isRequired>
                  <InputGroup mb='5'>
                    <InputLeftAddon
                      bg='var(--shade5)'
                      color='white'
                    >
                      <FiBookmark />Post Title
                    </InputLeftAddon>
                    <input
                      type='text'
                      name='title'
                      value={formState.title}
                      onChange={handleChange}
                      style={{
                        borderWidth: '1px',
                        borderColor: 'var(--shade6)',
                        paddingLeft: '1rem',
                        width: '100%'
                      }}
                    />
                  </InputGroup>
                  <Box>
                    <textarea
                      type='textarea'
                      name='text'
                      placeholder='post content'
                      value={formState.text}
                      onChange={handleChange}
                      style={{
                        borderWidth: '1px',
                        borderColor: 'var(--shade6)',
                        paddingLeft: '1rem',
                        paddingTop: '0.75rem',
                        minHeight: '10vh',
                        height: 'fit-content',
                        width: '100%'
                      }}
                    />
                  </Box>
                  <Box textAlign='right'>
                    <Menu >
                      <MenuButton as={Button} rightIcon={<FiPlus />}
                        variant='solid'
                        h='1.75rem'
                        size='lg'
                        mt='5'
                        p='5'
                        bg='var(--shade4)'
                        color='white'
                        _hover={{ bg: 'var(--shade2)', color: 'var(--shade6)' }}
                      >
                        Add/Share Routine
                      </MenuButton>
                      <Portal>
                        <MenuList zIndex='popover'>
                          {/* map through routines to create menu item for each routine */}
                          {routines.map((routine, index) => (
                            <MenuItem key={routine._id} onClick={() => { handleAddRoutine(`${index}`) }}>{routine.title}</MenuItem>
                          ))}
                        </MenuList>
                      </Portal>
                    </Menu>
                  </Box>
                </FormControl>
              </ModalBody>
              <ModalFooter
                mt='5'
                pt='7'
                justifyContent='space-between'
                borderTop='1px'
                borderColor='var(--shade2)'
              >
                <Button mr={3} onClick={redirectBlog}>
                  Close
                </Button>
                <Button
                  type='submit'
                  bg='var(--shade1)'
                  color='white'
                  _hover={{ bg: 'var(--shade2)', color: 'var(--shade6)' }}
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