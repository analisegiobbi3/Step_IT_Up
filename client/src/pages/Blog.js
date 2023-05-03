// import packages
import React, { useState } from 'react';
import { Link } from 'react-router-dom'

// import queries
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_POSTS } from '../utils/queries';

// import local component
import Posts from '../components/Posts';

// import package component
import {
  Box, Flex, Spacer, Stack, Heading, Button, Spinner,
} from '@chakra-ui/react'

// import local style sheet
import '../styles/Blog.css';

// functional component for the blog page
const Blog = () => {

  // set if the my post button is clicked, default to false
  const [filter, setFilter] = useState(false);

  // query all data associated with the signed in user
  const { loadingMyPosts, data: myPostData } = useQuery(QUERY_ME);
  // extract the posts from the user data
  const myPosts = myPostData?.me.posts || [];

  // query all the posts in the database
  const { loadingAllPosts, data: allPostData } = useQuery(QUERY_POSTS);
  // define the posts from the query data
  const allPosts = allPostData?.posts || [];

  return (
    <Box className='blog-page'>
      <Flex mb='5'>
        <Box>
          <Heading size='2xl'>Share the Progress!</Heading>
        </Box>
        <Spacer />
        <Box mr='5'>
          {/* check if the my post button is clicked to show buttons of different color styling */}
          {/* alternate buttons onClick by inverting the filter state */}
          {filter ?
            <Button variant='solid' mb='5' bg='var(--shade4)' onClick={() => setFilter(!filter)}>My Posts</Button>
            :
            <Button variant='solid' mb='5' bg='var(--shade1)' onClick={() => setFilter(!filter)}>My Posts</Button>
          }
        </Box>
        <Box>
          <Button variant='solid' mb='5' bg='var(--shade1)'><Link to='/posts/createPost'>Create Post</Link></Button>
        </Box>
      </Flex>
      <Stack>
        {/* based on if filter is true, pass in allPosts or myPosts into the component */}
        {filter ? (
          <Box>
            {loadingMyPosts ? (
              <Box m='auto' mb='10'>
                <Link to='/'><Spinner /> Loading...</Link>
              </Box>
            ) : (
              // filter is true and data loaded, render Posts component and pass in myPosts and filter state
              <Posts
                posts={myPosts}
                filter={filter}
              />
            )}
          </Box>
        ) : (
          <Box>
            {loadingAllPosts ? (
              <Box m='auto' mb='10'>
                <Link to='/'><Spinner /> Loading...</Link>
              </Box>
            ) : (
              // filter is false and data loaded, render Posts component and pass in allPosts and filter state
              <Posts
                posts={allPosts}
                filter={filter}
              />
            )}
          </Box>
        )}

      </Stack>
    </Box>
  );
}

export default Blog;