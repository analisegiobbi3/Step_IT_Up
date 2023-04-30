import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST } from '../utils/queries';
import { REMOVE_COMMENT } from '../utils/mutations';

import {
    Box, Flex, Spacer, IconButton, Text, 
} from '@chakra-ui/react'

import { FiMinusSquare } from 'react-icons/fi';

import '../styles/Blog.css';

const Comments = ({ postId, username }) => {

    // emulates a fetch (useQuery expects a Promise)
    const emulateFetch = _ => {
        return new Promise(resolve => {
            resolve([{ data: 'ok' }]);
        });
    };

    const { loading, data, refetch } = useQuery(QUERY_POST, {
        variables: { postId: postId },
    }, emulateFetch, {
        refetchOnWindowFocus: false,
        enabled: true
    });

    const comments = data?.post.comments || [];

    const [removeComment, { removeCommentData }] = useMutation(REMOVE_COMMENT);

    const handleRemoveComment = async (event) => {
        event.preventDefault();
        const { id } = event.target;

        if (id !== '') {
            try {
                const { removeCommentData } = await removeComment({
                    variables: { postId, commentId: id },
                });

                refetch();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const matchUser = (author) => {
        if (author == username) {
            return true
        } else {
            return false
        }
    }

    if (!comments.length) {
        return;
    };

    return (
        <div>
            {comments.map((comment) => (
                <Flex key={comment._id} justifyContent='space-between' alignItems='center' mb='2'>
                    <Text>{comment.commentText}</Text>
                    <Spacer />
                    <Text>{comment.commentAuthor}, {comment.commentCreatedAt}</Text>
                    {matchUser(`${comment.commentAuthor}`) ?
                        (<IconButton ml='2' size='sm'
                            icon={<FiMinusSquare />}
                            id={comment._id}
                            onClick={handleRemoveComment} />)
                        :
                        (<Box></Box>)}
                </Flex>
            ))}
        </div>
    );
};

export default Comments;
