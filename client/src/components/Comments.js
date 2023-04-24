import React from 'react'
// import { useMutation } from "@apollo/client"
import { Card, CardBody, CardFooter, Text } from '@chakra-ui/react'
// import { REMOVE_COMMENT } from '../utils/mutations'

const Comments = ({ comments = [] }) => {
    if (!comments.length) {
        return <h3>No one has commented on this post yet</h3>
    }
    // const [removeComment] = useMutation(REMOVE_COMMENT)
    // const handleOnClick = () => {
    //     removeComment({ variables: { commentId }})
    // }

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {comments && comments.map((comment) => {
                    <Card key={comment._id}>
                         <CardBody>
                            <Text>{comment.commentText}</Text>
                        </CardBody>
                        <CardFooter>
                            By: {comment.commentAuthor} on {comment.createdAt}
                        </CardFooter>
                    </Card>
                })}
            </div>
        </div>
    )
}

export default Comments;