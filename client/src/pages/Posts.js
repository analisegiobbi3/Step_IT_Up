import React from 'react'
import CreatePost from './CreatePost'

import { useQuery } from '@apollo/client'

import AllPosts from '../components/AllPosts'

import { QUERY_POSTS } from '../utils/queries'

const Posts = ({ handlePageChange }) => {
    const { loading, data } = useQuery(QUERY_POSTS)
    const posts = data?.posts || []
    const createPost = () => {
        return <CreatePost />
    }

    return(
        <main>
            <a href="#Post" onClick={createPost}>
                <button>Post</button>
            </a>
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