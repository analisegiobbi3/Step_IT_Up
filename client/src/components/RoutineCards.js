// impoty package
import React from 'react';

// import mutation
import { useMutation } from '@apollo/client';
import { REMOVE_ROUTINE } from '../utils/mutations';

// import package components
import {
  Box, SimpleGrid, Heading, Text, Button,
  Card, CardHeader, CardBody, CardFooter,
} from '@chakra-ui/react'

// import local style sheet
import '../styles/Routine.css';

// functional component for routine cards on the routine page
const RoutineCards = ({ routines }) => {

  // define mutation
  const [removeRoutine, { removeRoutineError }] = useMutation(REMOVE_ROUTINE);

  // on click to remove routine (delete button)
  const handleRemoveRoutine = async (event) => {
    event.preventDefault();
    // define id (routineId) from event
    const { id } = event.target;

    try {
      const { routineData } = await removeRoutine({
        variables: { routineId: id },
      });

      // reload the page
      window.location.assign('/routines');
    } catch (e) {
      console.error(e);
    }

  };

  // if not routines were passed, return message
  if (!routines.length) {
    console.log(routines)
    return <Heading>You don't have any routines. Click 'New Routine' to get started!</Heading>;
  };

  return (
    <Box>
      <SimpleGrid spacing={6} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {/* map through routine data, create a card for each routine */}
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
              {/* pass in the routineId and function used to remove routine */}
              <Button id={routine._id} onClick={handleRemoveRoutine}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RoutineCards;
