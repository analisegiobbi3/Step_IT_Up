import React from 'react'
import { Button, Center } from '@chakra-ui/react'

import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client'

import AllPosts from '../components/AllPosts'

import { QUERY_POSTS } from '../utils/queries'

const Posts = ({ handlePageChange }) => {
    const { loading, data } = useQuery(QUERY_POSTS)
    const posts = data?.posts || []


    return(
        <main>
            <Link to='/posts/addPost'>
                <Center>
                    <Button colorScheme='purple' variant='outline' align='center' mt={5}>
                        Post!
                    </Button>
                </Center>
            </Link>
            <div>
                {loading ? (
                <div>Loading...</div>
                ):(
                <AllPosts
                    posts = {posts}
                />
                )}
            </div>
        </main>
    )
}

export default Posts;