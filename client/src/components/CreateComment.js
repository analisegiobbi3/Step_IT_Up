import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { Input, Button, Center, Textarea } from '@chakra-ui/react'
import '../styles/CreatePost.css'

import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth'

const CreateComment= ({ postId }) => {
    const [commentText, setCommentText] = useState('')

    const [addComment] = useMutation(ADD_COMMENT)

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const { data } = await addComment({
                variables: {
                    postId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.username,
                }
            })

            setCommentText('')

        }catch(error){
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if(name === 'commentText'){
            setCommentText(value)
        }
    }

    return(
        <div>
            <h1>Comment Below!</h1>
            {Auth.loggedIn() ? (
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <Center>
                                <Textarea 
                                    placeholder='Type Comment Here!' 
                                    name="commentText"
                                    value={commentText}
                                    onChange={handleChange}
                                    size='md'
                                    width='350px'
                                />
                            </Center>
                        </div>
                        <div>
                            <Center>
                                <Button type='submit' colorScheme='purple' variant='outline' size='md' mb={5} mt={5}>
                                    Comment!
                                </Button>
                            </Center>
                        </div>
                    </form>
                </div>
            ) : (
            <p>
                You need to be logged in to Comment!
            </p>
            )}
        </div>
    )
}

export default CreateComment;