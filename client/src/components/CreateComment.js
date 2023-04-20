import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { Textarea } from '@chakra-ui/react'


import { ADD_COMMENT } from '../utils/mutations';
import Auth from ''

const CreateComment= ({ postId }) => {
    const [commentText, setCommentText] = useState('')

    const [addComment, { error }] = useMutation(ADD_COMMENT)

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
            <h2>Comment Below!</h2>
            {Auth.loggedIn() ? (
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <Textarea 
                                placeholder='Type Comment Here!' 
                                name="commentText"
                                value={commentText}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button>Comment!</button>
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

export default CreateComment();