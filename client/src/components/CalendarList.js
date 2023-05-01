import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_TRACKER, ADD_SCHEDULED_ROUTINES, UPDATE_SCHEDULED_ROUTINES, REMOVE_SCHEDULED_ROUTINES } from '../utils/mutations';

import {
  chakra, Stack, StackDivider, Flex, Box,
  Divider, Spacer, Tooltip, Heading, Text,
  Card, CardHeader, CardBody, CardFooter,
  ButtonGroup, Button, IconButton, Spinner,
  Checkbox, useCheckbox, useCheckboxGroup,
  Editable, EditableInput, EditablePreview, useEditableControls,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, useDisclosure,
} from '@chakra-ui/react'


import { FiCheck, FiX, FiEdit, FiPlusSquare, FiMinusSquare, FiExternalLink, FiEye } from 'react-icons/fi';

import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

const CalendarList = ({ trackerIndex }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps, } = useEditableControls()

    return isEditing ? (
      <ButtonGroup size='sm'>
        <IconButton icon={<FiCheck />} {...getSubmitButtonProps()} onClick={handleUpdateTracker} />
        <IconButton icon={<FiX />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <IconButton ml='3' size='md' icon={<FiEdit />} {...getEditButtonProps()} />
    )
  }

  // emulates a fetch (useQuery expects a Promise)
  const emulateFetch = _ => {
    return new Promise(resolve => {
      resolve([{ data: 'ok' }]);
    });
  };

  const { loading, data, refetch } = useQuery(QUERY_ME, emulateFetch, {
    refetchOnWindowFocus: false,
    enabled: true
  });

  const tracker = data?.me.tracker[trackerIndex] || [];
  const trackerWeight = data?.me.tracker[trackerIndex].weight || [];
  const trackerCalorie = data?.me.tracker[trackerIndex].calorie || [];
  const trackerScheduledRoutines = data?.me.tracker[trackerIndex].scheduledRoutines || [];
  const routines = data?.me.routines || [];

  const [weight, setWeight] = useState(trackerWeight);
  const [calorie, setCalorie] = useState(trackerCalorie);
  const [updateTracker, { updateTrackerData }] = useMutation(UPDATE_TRACKER);

  const handleUpdateTracker = async (event) => {
    event.preventDefault();

    try {
      if (weight && calorie) {
        const { updateTrackerData } = await updateTracker({
          variables: { trackerId: tracker._id, weight: Number(weight), calorie: Number(calorie) },
        });
      } else if (!weight && calorie) {
        const { updateTrackerData } = await updateTracker({
          variables: { trackerId: tracker._id, calorie: Number(calorie) },
        });
      } else if (weight && !calorie) {
        const { updateTrackerData } = await updateTracker({
          variables: { trackerId: tracker._id, weight: Number(weight) },
        });
      } else { return }

      refetch();
    } catch (e) {
      console.error(e);
    }

  };

  const [routineTitle, setRoutineTitle] = useState('Hover to preview');
  const [routineText, setRoutineText] = useState('');

  function CustomCheckbox(props) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

    return (
      <chakra.label
        display='flex'
        flexDirection='row'
        alignItems='center'
        gridColumnGap={2}
        maxWidth='300'
        px={3}
        py={1}
        cursor='pointer'
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems='center'
          justifyContent='center'
          border='2px solid'
          borderColor='var(--shade5)'
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg='var(--shade4)' />}
        </Flex>
        <Text color='gray.700' {...getLabelProps()}>{props.value}</Text>
      </chakra.label>
    )
  }

  const { value, getCheckboxProps } = useCheckboxGroup({})

  const [addScheduledRoutines, { routineData }] = useMutation(ADD_SCHEDULED_ROUTINES);

  const handleAddRoutines = async (event) => {
    event.preventDefault()

    for (let i = 0; i < value.length; i++) {
      const routine = value[i];

      try {
        const { routineData } = await addScheduledRoutines({
          variables: { trackerId: tracker._id, routineName: routine },
        })

      } catch (e) {
        console.error(e);
      }
    }

    onClose()
  };

  const [removeScheduledRoutines, { removeScheduledRoutinesData }] = useMutation(REMOVE_SCHEDULED_ROUTINES);

  const handleRemoveScheduledRoutines = async (event) => {
    event.preventDefault();
    const { id } = event.target;

    if (id !== '') {
      try {
        const { removeScheduledRoutinesData } = await removeScheduledRoutines({
          variables: { trackerId: tracker._id, scheduledRoutinesId: id },
        });

        refetch();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [checkedItems, setCheckedItems] = useState([])

  const [updateScheduledRoutines, { updateScheduledRoutinesData }] = useMutation(UPDATE_SCHEDULED_ROUTINES);

  const handleUpdateScheduledRoutines = async (event) => {
    event.preventDefault();
    const { id, checked } = event.target;

    if (id !== '') {
      try {
        const { updateScheduledRoutineData } = await updateScheduledRoutines({
          variables: { scheduledRoutinesId: id, complete: checked },
        });

      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <Box>
      {loading ? (
        <Box m='auto' mb='10'>
          <Link to='/'><Spinner /> Loading...</Link>
        </Box>
      ) : (
        <Box>
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
              {trackerScheduledRoutines.map((routine, index) => (
                <Box key={routine._id}>
                  <Text fontSize='sm' mb='2'>
                    <IconButton
                      variant='solid'
                      aria-label='Remove Circle'
                      size='sm'
                      mr='5'
                      icon={<FiMinusSquare />}
                      id={routine._id}
                      onClick={handleRemoveScheduledRoutines}
                    />
                    <Checkbox
                      size='lg'
                      colorScheme='blue'
                      defaultChecked={routine.complete}
                      isChecked={checkedItems[{ index }]}
                      id={routine._id}
                      onChange={(e) => {
                        setCheckedItems(e.target.checked);
                        handleUpdateScheduledRoutines(e)
                      }}
                    >
                      {routine.routineName}
                    </Checkbox>
                  </Text>
                </Box>
              ))}
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
                    display='flex'
                    alignItems='center'
                    fontSize='2xl'
                    defaultValue={trackerWeight}
                  >
                    <EditablePreview />
                    <EditableInput
                      as={EditableInput}
                      type='number'
                      name='weight'
                      value={weight}
                      onChange={(e) => { setWeight(e.target.value) }}
                    />
                    <EditableControls />
                  </Editable>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Box>
                  <Heading size='lg' textTransform='uppercase' mb='5'>Calorie (C)</Heading>
                </Box>
                <Spacer />
                <Box>
                  <Editable
                    textAlign='left'
                    isPreviewFocusable={false}
                    display='flex'
                    alignItems='center'
                    fontSize='2xl'
                    defaultValue={trackerCalorie}
                  >
                    <EditablePreview />
                    <EditableInput
                      as={EditableInput}
                      type='number'
                      name='calorie'
                      value={calorie}
                      onChange={(e) => { setCalorie(e.target.value) }}
                    />
                    <EditableControls />
                  </Editable>
                </Box>
              </Flex>
            </Box>
          </Stack>
          <Drawer placement='left' size='sm' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth='1px' color='var(--shade6)'>Select routine(s) to preview and add</DrawerHeader>
              <DrawerBody>
                <Box>
                  <Stack>
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Box>
                        <Text as='b' my='2'>Routines:</Text>
                      </Box>
                      <Box>
                        <Link to='/routines' >
                          <Tooltip label='Add / Edit / View Routines'>
                            <IconButton aria-label='Routine' bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade5)' }} icon={<FiExternalLink />} />
                          </Tooltip>
                        </Link>
                      </Box>
                    </Flex>
                    <Box overflowY='auto' maxHeight='28vh'>
                    {routines.map((routine, index) => (
                      <Flex key={routine._id} 
                      justifyContent='space-between' 
                      alignItems='center'
                      my='3'
                      >
                        <Box>
                          <CustomCheckbox defaultChecked={false} {...getCheckboxProps({ value: `${routine.title}` })} />
                        </Box>
                        <Box>
                          <IconButton aria-label={routine.title}
                            name={routine.title}
                            value={routine.text}
                            bg='var(--shade2)' color='var(--shade6)'
                            _hover={{ bg: 'var(--shade4)' }}
                            icon={<FiEye />}
                            onMouseEnter={(e) => { setRoutineTitle(e.target.name); setRoutineText(e.target.value) }} />
                        </Box>
                      </Flex>
                    ))}
                    </Box>
                    <Divider borderWidth='3px' borderColor='var(--shade1)' />
                    <Text as='b'>Preview: </Text>
                    <Card borderWidth='3px' borderColor='var(--shade5)'>
                      <CardHeader>
                        <Heading size='md' defaultValue='No routine selected'>{routineTitle}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{routineText}</Text>
                      </CardBody>
                      <CardFooter></CardFooter>
                    </Card>
                  </Stack>
                </Box>
              </DrawerBody>
              <DrawerFooter borderTopWidth='1px'>
                <Button variant='outline' mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade5)' }} onClick={handleAddRoutines}>Add Routine(s)</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      )}
    </Box>

  );
};

export default CalendarList;
