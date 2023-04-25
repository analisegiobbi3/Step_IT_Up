// import package and local style sheet
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Accordion, AccordionItem, AccordionButton,
  AccordionPanel, AccordionIcon,
  SimpleGrid, Grid, GridItem, Box, Flex, Spacer, IconButton,
  Radio, RadioGroup, Stack, Checkbox, useToast,
  Input, InputGroup, InputLeftAddon,
  Heading, Text, Textarea, Button, 
  Card, CardHeader, CardBody, CardFooter, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton,
  ButtonGroup,


} from '@chakra-ui/react'

import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiCommentAdd } from "react-icons/bi";
import { FiCheck, FiX, FiMinusSquare } from "react-icons/fi";

import '../styles/Blog.css';

const Blog = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box className='blog-page'>
      <Flex mb='5'>
        <Box>
          <Heading size='2xl'>Share the Progress!</Heading>
        </Box>
        <Spacer />
        <Box mr='5'>
          <Button variant='solid' mb='5'>My Posts</Button>
        </Box>
        <Box>
          <Button onClick={onOpen} variant='solid' mb='5'>Create Post</Button>
        </Box>
      </Flex>
      <Stack>
        {/* repeat for blog map */}
        <Card size='lg' mb='5'>
          <CardHeader display='flex' justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Blog Topic</Heading>
            <Button>Delete (only visible if user matches)</Button>
          </CardHeader>
          <CardBody py='0'>
            <Text white-space='pre-line'>Blog content</Text>
          </CardBody>
          <CardFooter justifyContent='space-between' alignItems='center'>
            <Text>Username, created Date</Text>
            <Spacer />
            <IconButton variant='ghost' mr='2' size='lg' _hover={{ bg: 'var(--shade5)' , color: 'white'}} icon={<AiOutlineLike />} />
            <Text>#like</Text>
          </CardFooter>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'var(--shade2)', color: 'white' }}>
                  <Box as="span" flex='1' textAlign='right' pr='2'>
                    View Comments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pl='6'>
                {/* repeat for comments */}
                <Flex justifyContent='space-between' alignItems='center' mb='2'>
                  <Text>comment 1</Text>
                  <Spacer />
                  <Text>username, created date</Text>
                  <IconButton ml='2' size='sm' icon={<FiMinusSquare />} onClick={onOpen} />
                </Flex>
                {/* end of repeat for comments */}
                <Flex justifyContent='space-between' alignItems='center' mb='2'>
                  <Text>comment 1</Text>
                  <Spacer />
                  <Text>username, created date</Text>
                  <IconButton ml='2' size='sm' icon={<FiMinusSquare />} onClick={onOpen} />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                  <Flex alignItems='center'>
                  <AccordionButton _expanded={{ bg: 'var(--shade4)', color: 'white' }} >
                    <Box as="span" flex='1' textAlign='right' pr='2'>Add Comment</Box><BiCommentAdd />
                  </AccordionButton>
                  </Flex>
                </h2>
                <AccordionPanel pb={4} pl='6'>
                  <Flex alignItems='center'>
                    <Input mr='2' placeholder='click to add comments'/>
                    <ButtonGroup justifyContent='center' size='sm' ml='2'>
                      <IconButton icon={<FiCheck />} />
                      <IconButton icon={<FiX />} />
                    </ButtonGroup>
                  </Flex>
                </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
        {/* end of repeat for blog */}
        
        <Card size='lg' mb='5'>
          <CardHeader display='flex' justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Another Topic</Heading>
            <Button>Delete (only visible if user matches)</Button>
          </CardHeader>
          <CardBody py='0'>
            <Text white-space='pre-line'>Blog content</Text>
          </CardBody>
          <CardFooter justifyContent='space-between' alignItems='center'>
            <Text>Username, created Date</Text>
            <Spacer />
            <IconButton variant='ghost' mr='2' size='lg' _hover={{ bg: 'var(--shade5)' , color: 'white'}} icon={<AiOutlineLike />} />
            <Text>#like</Text>
          </CardFooter>
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton _expanded={{ bg: 'var(--shade2)', color: 'white' }}>
                  <Box as="span" flex='1' textAlign='right' pr='2'>
                    View Comments
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pl='6'>
                {/* repeat for comments */}
                <Flex justifyContent='space-between' alignItems='center' mb='2'>
                  <Text>comment 1</Text>
                  <Spacer />
                  <Text>username, created date</Text>
                  <IconButton ml='2' size='sm' icon={<FiMinusSquare />} onClick={onOpen} />
                </Flex>
                {/* end of repeat for comments */}
                <Flex justifyContent='space-between' alignItems='center' mb='2'>
                  <Text>comment 1</Text>
                  <Spacer />
                  <Text>username, created date</Text>
                  <IconButton ml='2' size='sm' icon={<FiMinusSquare />} onClick={onOpen} />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                  <Flex alignItems='center'>
                  <AccordionButton _expanded={{ bg: 'var(--shade4)', color: 'white' }} >
                    <Box as="span" flex='1' textAlign='right' pr='2'>Add Comment</Box><BiCommentAdd />
                  </AccordionButton>
                  </Flex>
                </h2>
                <AccordionPanel pb={4} pl='6'>
                  <Flex alignItems='center'>
                    <Input mr='2' placeholder='click to add comments'/>
                    <ButtonGroup justifyContent='center' size='sm' ml='2'>
                      <IconButton icon={<FiCheck />} />
                      <IconButton icon={<FiX />} />
                    </ButtonGroup>
                  </Flex>
                </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Card>
      </Stack>
    </Box>
  );
}

export default Blog;