// import package and local style sheet
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST, QUERY_ME } from '../utils/queries';
import { UPDATE_POST } from '../utils/mutations';

import {
  Box, Button, FormControl, Spinner,
  InputGroup, InputLeftAddon, Portal,
  Menu, MenuButton, MenuList, MenuItem,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'

import { FiBookmark, FiPlus } from 'react-icons/fi';

const EditPost = () => {

  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const navigate = useNavigate();
  const redirectBlog = () => navigate('/posts');

  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_POST, {
    variables: { postId: postId },
  });
  const post = data?.post || [];

  const { loading: routinesLoading, data: myData } = useQuery(QUERY_ME)
  const routines = myData?.me.routines || [];

  const [formState, setFormState] = useState({ title: post.title, text: post.text });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleAddRoutine = (index) => {

    const currentTitle = formState.title
    const currentText = formState.text
    let newText = currentText +  '\n\n' + routines[index].title + ': \n' + routines[index].text
    setFormState({...formState, text: newText})
  }

  const [updatePost, { error, postData }] = useMutation(UPDATE_POST);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.title !== '' && formState.text !== '') {
      try {
        const { postData } = await updatePost({
          variables: { postId, ...formState },
        });
  
        window.location.assign('/posts');
      } catch (e) {
        console.error(e);
      }
    }

    setFormState({
      title: '',
      text: '',
    });
  };

  return (
    <Box className='edit-post-modal' onMouseEnter={()=>{setFormState({title: post.title, text: post.text})}}>
      <Modal isOpen={isOpen} onClose={redirectBlog} scrollBehavior='inside' size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Edit Post
          </ModalHeader>
          <ModalCloseButton />
          {postData ? (
            <Box m='auto' mb='10'>
              <Link to='/posts'><Spinner /> Updating Post...</Link>
            </Box>
          ) : (
            <div>
              {loading ? (
                <Box m='auto' mb='10'>
                  <Link to='/'><Spinner /> Loading...</Link>
                </Box>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <ModalBody>
                    <FormControl isRequired>
                      <InputGroup mb='5'>
                        <InputLeftAddon bg='var(--shade5)' color='white'>
                          <FiBookmark />Post Title
                        </InputLeftAddon>
                        <input
                          type='text'
                          name='title'
                          defaultValue={post.title}
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
                          defaultValue={post.text}
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
                          {routines.map((routine, index) => (
                            <MenuItem key={routine._id} onClick={() => {handleAddRoutine(`${index}`)}}>{routine.title}</MenuItem>
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
                      Update Post
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </div>
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

export default EditPost;