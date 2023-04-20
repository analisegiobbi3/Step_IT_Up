import React from 'react';
import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, Text, CardHeader, Heading } from '@chakra-ui/react'


const AllPosts = ({
    posts

}) => {
    if (!posts.length){
        return <h1>No One Has Stepped Up and Posted Yet! Be the First!</h1>
    }

    return(
        <div>
            <Link>
                <button to={'/posts/createPost'}>Post</button>
            </Link>

            {posts && posts.map((post) =>{
                <Card key={post._id}>
                    <CardHeader>
                        <Link to={`/posts/${post._id}`}>
                            <Heading>{post.title}</Heading>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.text}</Text>
                    </CardBody>
                    <CardFooter>
                        By: {post.author} on {post.createdAt}
                    </CardFooter>
                </Card>

            })}

        </div>
    )
}

export default AllPosts()
