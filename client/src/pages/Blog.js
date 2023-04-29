// import package and local style sheet
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import { QUERY_POSTS } from '../utils/queries';
import Posts from '../components/Posts';

import {
  Box, Flex, Spacer, Stack, Heading, Button, Spinner,
} from '@chakra-ui/react'

import '../styles/Blog.css';

const Blog = () => {

  const [filter, setFilter] = useState(false);
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <Box className='blog-page'>
      <Flex mb='5'>
        <Box>
          <Heading size='2xl'>Share the Progress!</Heading>
        </Box>
        <Spacer />
        <Box mr='5'>
          {filter ?
            <Button variant='solid' mb='5' bg='var(--shade5)' onClick={() => setFilter(!filter)}>My Posts</Button>
            :
            <Button variant='solid' mb='5' bg='var(--shade1)' onClick={() => setFilter(!filter)}>My Posts</Button>
          }
        </Box>
        <Box>
          <Button variant='solid' mb='5' bg='var(--shade1)'><Link to="/posts/createPost">Create Post</Link></Button>
        </Box>
      </Flex>
      <Stack>
        {loading ? (
          <Box m='auto' mb='10'>
            <Link to="/"><Spinner /> Loading...</Link>
          </Box>
        ) : (
          <Posts
            posts={posts}
          // filter={filter}
          />
        )}
      </Stack>
    </Box>
  );
}

export default Blog;