import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT, REMOVE_POST, ADD_LIKE, REMOVE_LIKE } from "../utils/mutations";

import Comments from '../components/Comments';

import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon,
  Box, Flex, Spacer, IconButton,
  Heading, Text, Button,
  Card, CardHeader, CardBody, CardFooter,
  ButtonGroup,
} from '@chakra-ui/react'

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentAdd, BiEdit } from "react-icons/bi";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";

import '../styles/Blog.css';

const Posts = ({ posts }) => {

  const navigate = useNavigate();
  const userId = Auth.getProfile().data._id;
  const [formState, setFormState] = useState({ postId: "", commentText: "" });
  const [ addComment, { addCommentError }] = useMutation(ADD_COMMENT);
  const [ removePost, { removePostError }] = useMutation(REMOVE_POST);
  const [ addLike, { addLikeError }] = useMutation(ADD_LIKE);
  // const [ removeLike, { removeLikeError }] = useMutation(REMOVE_LIKE);

  const handleChange = (event) => {
    const { name, value, id } = event.target;

    setFormState({
      ...formState,
      [name]: value,
      postId: id,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { commentData } = await addComment({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    setFormState({
      postId: "",
      commentText: "",
    });
  };

  const handleRemovePost = async (event) => {
    event.preventDefault();
    const { id } = event.target;

    try {
      const { postData } = await removePost({
        variables: { postId: id },
      });

      window.location.assign('/posts');
    } catch (e) {
      console.error(e);
    }

  };

  const like = (index) => {
    if (posts[index].likes.indexOf(userId) > -1) {
      return true
    }
    return false
  };

  const handleAddLike = async (postId) => {

    try {
      const { addLikeData } = await addLike({
        variables: { postId,  userId },
      });

    } catch (e) {
      console.error(e);
    }
  };

  if (!posts.length) {
    return <Heading>No Post yet. Be the first to motivate!</Heading>;
  }

  return (
    <div>
      {posts.map((post, index) => (
        <Card size='lg' mb='5' key={post._id} >
          <CardHeader display='flex' justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>{post.title}</Heading>
            <Box>
            <Button mr='3' onClick={()=> {navigate(`/posts/editPost/${post._id}`)}}><BiEdit /></Button>
            <Button id={post._id} onClick={handleRemovePost}><FiTrash2 /></Button>
            </Box>
          </CardHeader>
          <CardBody py='0'>
            <Text white-space='pre-line'>{post.text}</Text>
          </CardBody>
          <CardFooter justifyContent='space-between' alignItems='center'>
            <Text>{post.author}, {post.createdAt}</Text>
            <Spacer />
            {like(index) ?
              <IconButton variant='ghost' mr='2' size='lg' 
              _hover={{ bg: 'var(--shade5)', color: 'white' }} 
              icon={<AiFillLike />} 
              onClick={()=>{handleAddLike(post._id)}}
              />
              :
              <IconButton variant='ghost' mr='2' size='lg' 
              _hover={{ bg: 'var(--shade5)', color: 'white' }} 
              icon={<AiOutlineLike />} 
              onClick={()=>{handleAddLike(post._id)}}
              />
            }
            <Text>{post.likes.length}</Text>
          </CardFooter>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'var(--shade2)', color: 'white' }}>
                  <Box as="span" flex='1' textAlign='right' pr='2'>
                    View Comments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pl='6'>
                <Comments
                  comments={post.comments}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <Flex alignItems='center'>
                  <AccordionButton _expanded={{ bg: 'var(--shade4)', color: 'white' }} >
                    <Box as="span" flex='1' textAlign='right' pr='2'>Add Comment</Box><BiCommentAdd />
                  </AccordionButton>
                </Flex>
              </h2>
              <AccordionPanel pb={4} pl='6'>
                <Flex alignItems='center'>
                  <input 
                  mr='2' 
                  placeholder='click to add comments' 
                  id={post._id}
                  name='commentText'
                  value={formState.commentText}
                  onChange={handleChange}
                  />
                  <ButtonGroup justifyContent='center' size='sm' ml='2'>
                    <IconButton icon={<FiCheck />} onClick={handleFormSubmit}/>
                    <IconButton icon={<FiX />} onClick={()=> {setFormState({postId: "", commentText: ""})}} />
                  </ButtonGroup>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
