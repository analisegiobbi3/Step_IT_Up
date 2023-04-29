import React from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_ROUTINE } from "../utils/mutations";

import {
  Box, SimpleGrid, Heading, Text, Button,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react'

import '../styles/Routine.css';

const RoutineCards = ({ routines }) => {

  const [ removeRoutine, { removeRoutineError }] = useMutation(REMOVE_ROUTINE);

  const handleRemoveRoutine = async (event) => {
    event.preventDefault();
    const { id } = event.target;

    try {
      const { routineData } = await removeRoutine({
        variables: { routineId: id },
      });

      window.location.assign('/routines');
    } catch (e) {
      console.error(e);
    }

  };

  if (!routines.length) {
    console.log(routines)
    return <Heading>You don't have any routines. Click "New Routine" to get started!</Heading>;
  };

  return (
    <Box>
      <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {routines.map((routine) => (
        <Card size='lg' key={routine._id} >
          <CardHeader>
            <Heading size='lg'>{routine.title}</Heading>
          </CardHeader>
          <CardBody py='0'>
            <Text>
              {routine.text}
            </Text>
          </CardBody>
          <CardFooter>
            <Button id={routine._id}  onClick={handleRemoveRoutine}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
      </SimpleGrid>
    </Box>
  );
};

export default RoutineCards;
