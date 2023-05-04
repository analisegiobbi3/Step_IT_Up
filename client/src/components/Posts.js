// import packages and local auth
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth';

// import mutations
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, REMOVE_POST, ADD_LIKE, REMOVE_LIKE } from '../utils/mutations';

// import local components
import Comments from '../components/Comments';

// import package components
import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon,
  Box, Flex, Spacer, IconButton,
  Heading, Text, Button,
  Card, CardHeader, CardBody, CardFooter,
  ButtonGroup,
} from '@chakra-ui/react'

// import icons
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { BiCommentAdd, BiEdit } from 'react-icons/bi';
import { FiCheck, FiX, FiTrash2 } from 'react-icons/fi';

// import local style sheet
import '../styles/Blog.css';


// functional component each post on the posts page
const Posts = ({ posts, filter }) => {

  // navigate for the edit post button
  const navigate = useNavigate();
  // define userId and username from auth profile
  const userId = Auth.getProfile().data._id;
  const username = Auth.getProfile().data.username;
  // set form state for comment mutations, default empty
  const [formState, setFormState] = useState({ postId: '', commentText: '' });
  // define mutations for comments and likes
  const [addComment, { data: addCommentData }] = useMutation(ADD_COMMENT);
  const [removePost, { data: removePostData }] = useMutation(REMOVE_POST);
  const [addLike, { data: addLikeData }] = useMutation(ADD_LIKE);
  const [removeLike, { data: removeLikeData }] = useMutation(REMOVE_LIKE);

  // define like count for post
  const postLikeCount = (index) => postLikeCount[index] = posts[index].likes.length

  // check if user has liked post, set like icon type
  const like = (index) => {
    // define array of liked userId's for the post
    let likedPostIds = []
    // loop through the post likes
    for (let i = 0; i < posts[index].likes.length; i++) {
      // push to array the id's of liked users
      likedPostIds.push(posts[index].likes[i]._id)
    }
    // if the userId exists in the likedPostIds array, return true
    if (likedPostIds.indexOf(userId) > -1) {
      return true
    } 
    return false
  }

  // display specific like icon (filled/outline) based on like function output
  const likeIcon = (index) => {
    if (like(index)) {
      return <AiFillLike />
    }
    return <AiOutlineLike />
  }

  // define the id of the like icon based on like function output
  const likeState = (index) => {
    if (like(index)) {
      return 'liked'
    }
    return 'notLiked'
  }

  // check is user matches post author, determine display of edit and delete posts button
  const matchUser = (author) => {
    if (author === username) {
      return true
    } else {
      return false
    }
  }

  // on comment input change
  const handleChange = (event) => {
    // define commentText, value, and postId from event
    const { name, value, id } = event.target;

    // set form state to new values
    setFormState({
      ...formState,
      [name]: value,
      postId: id,
    });
  };

  // on click to add/submit comment
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add comment with variables form state
      const { commentData } = await addComment({
        variables: { ...formState },
      });

    } catch (e) {
      console.error(e);
    }

    // clear form state
    setFormState({
      postId: '',
      commentText: '',
    });
  };

  // on click to remove post (delete button)
  const handleRemovePost = async (event) => {
    event.preventDefault();
    // define postId from target
    const { id } = event.target;

    // if id is not blank
    if (id !== '') {
      try {
        // remove post with variable postId
        const { postData } = await removePost({
          variables: { postId: id },
        });

        // reload the page
        window.location.assign('/posts');
      } catch (e) {
        console.error(e);
      }
    }

  };

  // on like button click (to add or remove like)
  const handleLike = async (id, postId) => {

    // if postId and like state are not blank
    if (postId !== '' && id !== 'undefined') {
      // if post is currently liked
      if (id == 'liked') {
        try {
          // remove like with variable postId
          const { removeLikeData } = await removeLike({
            variables: { postId },
          });
  
        } catch (e) {
          console.error(e);
        }
        // if post is currently not liked
      } else if (id == 'notLiked') {
        try {
          // add like with variable postId
          const { addLikeData } = await addLike({
            variables: { postId },
          });
  
        } catch (e) {
          console.error(e);
        }
      }
      // reload page
      window.location.assign('/posts');
    }
    
  };

  // if no posts exist yet, return respective messages
  if (!posts.length) {
    // if my post button is clicked
    if (filter) {
      return <Heading>You have no post! Step It Up!</Heading>;
    }
    // if my post button is not clicked
    return <Heading>No Post yet. Be the first to motivate!</Heading>;
  }

  return (
    <div>
      {/* map through posts and create card for each post */}
      {posts.map((post, index) => (
        <Card size='lg' mb='5' key={post._id} >
          <CardHeader display='flex' justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>{post.title}</Heading>
            {/* if post's author is the current user, display edit and delete post button */}
            {matchUser(`${post.author}`) ? (
              <Box>
                {/* on edit post click, navigate to edit posts modal with parameter post_.id */}
                <Button mr='3' onClick={() => { navigate(`/posts/editPost/${post._id}`) }}><BiEdit /></Button>
                <Button id={post._id} onClick={handleRemovePost}><FiTrash2 /></Button>
              </Box>
            ) : (
              <Box></Box>
            )}
          </CardHeader>
          <CardBody py='0'>
            <Text style={{ whiteSpace: 'pre-line' }}>{post.text}</Text>
          </CardBody>
          <CardFooter justifyContent='space-between' alignItems='center'>
            <Text>{post.author}, {post.createdAt}</Text>
            <Spacer />
              <Box>
                <IconButton variant='ghost' mr='2' size='lg'
                    _hover={{ bg: 'var(--shade5)', color: 'white' }}
                    icon={likeIcon(index)}
                    id={likeState(index)}
                    onClick={(e) => { handleLike(e.target.id, post._id) }}
                  />
              </Box>
            <Text>{postLikeCount(index)}</Text>
          </CardFooter>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'var(--shade2)', color: 'white' }}>
                  <Box as='span' flex='1' textAlign='right' pr='2'>
                    View Comments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pl='6'>
                {/* render comment component for specific post */}
                <Comments
                  postId={post._id}
                  username={username}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <Flex alignItems='center'>
                  <AccordionButton _expanded={{ bg: 'var(--shade4)', color: 'white' }} >
                    <Box as='span' flex='1' textAlign='right' pr='2'>Add Comment</Box><BiCommentAdd />
                  </AccordionButton>
                </Flex>
              </h2>
              <AccordionPanel pb={4} pl='6'>
                <Flex alignItems='center'>
                  {/* input field to add comments */}
                  <input
                    mr='2'
                    placeholder='click to add comments'
                    id={post._id}
                    name='commentText'
                    value={formState.commentText}
                    onChange={handleChange}
                  />
                  <ButtonGroup justifyContent='center' size='sm' ml='2'>
                    <IconButton icon={<FiCheck />} onClick={handleFormSubmit} />
                    <IconButton icon={<FiX />} onClick={() => { setFormState({ postId: '', commentText: '' }) }} />
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
