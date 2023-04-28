import React from 'react';
import { Link } from 'react-router-dom';

import {
    Accordion, AccordionItem, AccordionButton,
    AccordionPanel, AccordionIcon,
    Box, Flex, Spacer, IconButton,
    Stack, Input, Heading, Text, Button,
    Card, CardHeader, CardBody, CardFooter,
    ButtonGroup,
} from '@chakra-ui/react'

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { FiCheck, FiX, FiMinusSquare } from "react-icons/fi";

import '../styles/Blog.css';

const Comments = ({
    comments,
}) => {
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
                    <IconButton ml='2' size='sm' icon={<FiMinusSquare />} />
                </Flex>
            ))}
        </div>
    );
};

export default Comments;
