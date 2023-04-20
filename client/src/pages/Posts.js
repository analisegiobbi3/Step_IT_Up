import React from 'react'
import { useQuery } from '@apolloClient'

import AllPosts from '../components/AllPosts'

import { QUERY_POSTS } from '../utils/queries'

const Posts = () => {
    const { loading, data } = useQuery(QUERY_POSTS)
    const posts = data?.posts || []

    return(
        <main>
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

export default Posts()