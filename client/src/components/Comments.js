// import package
import React from 'react';

// import query and mutation
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { REMOVE_COMMENT } from '../utils/mutations';

// import package components and icon
import {
    Box, Flex, Spacer, IconButton, Text,
} from '@chakra-ui/react'

import { FiMinusSquare } from 'react-icons/fi';

// import local style sheet
import '../styles/Blog.css';

// functional component for the comment section of each post on the post page
const Comments = ({ postId, username }) => {

    // emulates a fetch (useQuery expects a Promise)
    // used to re-query data and re-render page on event listener/change
    const emulateFetch = _ => {
        return new Promise(resolve => {
            resolve([{ data: 'ok' }]);
        });
    };

    // query post data with variable postId
    const { loading, data, refetch } = useQuery(QUERY_POST, {
        variables: { postId: postId },
    }, emulateFetch, {
        refetchOnWindowFocus: false,
        // enabled set to true allows query to run on page initialization
        enabled: true
    });

    // extract the post's comments from the query data
    const comments = data?.post.comments || [];

    // define remove comment mutation
    const [removeComment, { removeCommentData }] = useMutation(REMOVE_COMMENT);

    // on click to remove comment (minus icon button click)
    const handleRemoveComment = async (event) => {
        event.preventDefault();
        // define id (commentId) from event
        const { id } = event.target;

        // if id is not blank
        if (id !== '') {
            try {
                // remove comment with variables postId and commentId
                const { removeCommentData } = await removeComment({
                    variables: { postId, commentId: id },
                });

                // re-render the page
                refetch();
            } catch (e) {
                console.error(e);
            }
        }
    };

    // check if user matches the comment's author to determine display of remove comment button
    const matchUser = (author) => {
        if (author == username) {
            return true
        } else {
            return false
        }
    }

    // if not comment exist for post
    if (!comments.length) {
        return;
    };

    return (
        <div>
            {/* map through comment, create a flex text line for each comment */}
            {comments.map((comment) => (
                <Flex key={comment._id} justifyContent='space-between' alignItems='center' mb='2'>
                    <Text>{comment.commentText}</Text>
                    <Spacer />
                    <Text>{comment.commentAuthor}, {comment.commentCreatedAt}</Text>
                    {/* if user is the author of the comment, display the remove comment icon button */}
                    {matchUser(`${comment.commentAuthor}`) ?
                        (<IconButton ml='2' size='sm'
                            icon={<FiMinusSquare />}
                            id={comment._id}
                            onClick={handleRemoveComment}
                        />)
                        :
                        (<Box></Box>)}
                </Flex>
            ))}
        </div>
    );
};

export default Comments;
