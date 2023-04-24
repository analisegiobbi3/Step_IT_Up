import React, { useState } from 'react'
import { useMutation } from "@apollo/client"
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import EditPost from './EditPost'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Button } from '@chakra-ui/react'

import Comments from '../components/Comments'
import CreateComment from '../components/CreateComment'

import { QUERY_USER_POST } from '../utils/queries'
import { REMOVE_POST } from '../utils/mutations'

const ViewPost = () => {
    const [editMode, setEditMode] = useState(false)
    const { postId } = useParams()
    const { loading, data } = useQuery(QUERY_USER_POST, {
        variables: { postId: postId },
    });

    const [removePost] = useMutation(REMOVE_POST)
    const handleOnClick = () => {
        removePost({ variables: { postId }})
    }

    const post = data?.post || {};

    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div>
        {!editMode ? (
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
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                        <Button onClick={handleOnClick}>Delete</Button>
                    </CardFooter>
                </Card>
                <div>
                    <Comments comments={post.comments}/>
                </div>
                <div>
                    <CreateComment postId={post._id}/>
                </div>
            </div>
        ) : (
          <EditPost post={data.post} onCancel={() => setEditMode(false)} />
        )}
      </div>

    )
}

export default ViewPost;