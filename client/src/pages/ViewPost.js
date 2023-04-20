import React from 'react'

import { userParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'

import Comments from '../components/Comments'
import CreateComment from '../components/CreateComment'

import { QUERY_USER_POST } from '../utils/queries'

const ViewPost = () => {
    const { postId } = userParams()
    const { loading, data } = useQuery(QUERY_USER_POST, {
        variables: { postId: postId },
    });

    const post = data?.post || {};

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>
            <div>
                <Card>
                    <CardHeader>
                        <Heading size='md'> 
                            {post.title}
                            {post.author}
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.text}</Text>
                    </CardBody>
                    <CardFooter>
                        <Text>{post.createdAt}</Text>
                        <Button>Edit or Delete Post</Button>
                    </CardFooter>
                </Card>
            </div>
            <div>
                <Comments comments={post.comments}/>
            </div>
            <div>
                <CreateComment postId={post._id}/>
            </div>
        </div>
    )
}

export default ViewPost;