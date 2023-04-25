// import package and local style sheet
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
  Grid, GridItem, Stack, StackDivider,
  Card, CardHeader, CardBody, CardFooter,
  Flex, Box, Divider, Spacer, Tooltip,
  ButtonGroup, Button, IconButton,
  Heading, Text, Input, Checkbox,
  Editable, EditableInput, EditablePreview, useEditableControls,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, useDisclosure,
} from '@chakra-ui/react'

import { FiCheck, FiX, FiEdit, FiPlusSquare, FiMinusSquare, FiExternalLink } from "react-icons/fi";

import '../styles/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure()

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup size='sm'>
        <IconButton icon={<FiCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<FiX />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <IconButton ml='3' size='md' icon={<FiEdit />} {...getEditButtonProps()} />
    )
  }

  return (
    <Box className='calendar-page'>
      <Grid templateColumns='repeat(10, 1fr)' gap={6}>
        <GridItem colSpan={5}>
          <div className="calendar">
            <div className='calendar-container'>
              <Calendar onChange={setDate} value={date} calendarType="US" />
            </div>
          </div>
        </GridItem>
        <GridItem colSpan={5}>
          <Card>
            <CardHeader>
              <Heading textTransform='uppercase'>{date.toDateString()}</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Flex>
                    <Box>
                      <Heading size='lg' textTransform='uppercase' mb='5'>Routines</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                      <IconButton ml='3' size='md' icon={<FiPlusSquare />} onClick={onOpen} />
                    </Box>
                  </Flex>
                  {/* duplicate this section for routines */}
                  <Text fontSize='sm'>
                    <IconButton variant='solid' aria-label='Remove Circle' size='sm' mr='5' icon={<FiMinusSquare />} />
                    <Checkbox size='lg' colorScheme='green'>
                      Routine 1
                    </Checkbox>
                  </Text>
                  {/* end of section */}
                </Box>
                <Box>
                  <Flex>
                    <Box>
                      <Heading size='lg' textTransform='uppercase' mb='5'>Calories (C)</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                      <Editable
                        textAlign='left'
                        isPreviewFocusable={false}
                      >
                        <EditablePreview />
                        <Input as={EditableInput} />
                        <EditableControls />
                      </Editable>
                    </Box>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Box>
                      <Heading size='lg' textTransform='uppercase' mb='5'>Weight (lbs)</Heading>
                    </Box>
                    <Spacer />
                    <Box>
                      <Editable
                        textAlign='left'
                        isPreviewFocusable={false}
                      >
                        <EditablePreview />
                        <Input as={EditableInput} />
                        <EditableControls />
                      </Editable>
                    </Box>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <Drawer placement='left' size='sm' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px' color='var(--shade6)'>Select routine(s) to preview and add</DrawerHeader>
          <DrawerBody>
            <Box overflowY="auto" maxHeight="100vh">
              <Stack>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Text as='b' my='2'>Routines:</Text>
                  </Box>
                  <Box>
                    <Link to='/routine' >
                      <Tooltip label='Add / Edit / View Routines'>
                        <IconButton aria-label='Routine' bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade5)' }} icon={<FiExternalLink />} />
                      </Tooltip>
                    </Link>
                  </Box>
                </Flex>
                <Checkbox>Routine 1</Checkbox>
                <Checkbox>Routine 1</Checkbox>
                <Checkbox>Routine 1</Checkbox>
                <Checkbox>Routine 1</Checkbox>
                <Divider borderWidth='3px' borderColor='var(--shade1)' />
                <Text as='b' my='5'>Preview: </Text>
                <Card>
                  <CardHeader>
                    <Heading size='md'>Routine 1</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>View a summary of all your customers over the last month.</Text>
                  </CardBody>
                  <CardFooter>
                    <Button bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade5)' }}>Delete</Button>
                  </CardFooter>
                </Card>
              </Stack>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade5)' }}>Add Routine(s)</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default CalendarPage;