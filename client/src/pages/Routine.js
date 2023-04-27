// import package and local style sheet
import React from "react";
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import { QUERY_ROUTINES } from '../utils/queries';
import RoutineCards from '../components/RoutineCards';

import {
  SimpleGrid, Flex, Box, Spacer, 
  Heading, Button, Spinner,
} from '@chakra-ui/react'

import '../styles/Routine.css';

const Routine = () => {

  const { loading, data } = useQuery(QUERY_ROUTINES);
  const routines = data?.routines || [];

  return (
    <Box className='routine-page'>
      <Flex mb='5'>
        <Box>
          <Heading size='2xl'>My Routines</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button variant='solid' mb='5'><Link to="/routines/createRoutine">New Routine</Link></Button>
        </Box>
      </Flex>
      {loading ? (
          <Box m='auto' mb='10'>
            <Link to="/"><Spinner /> Loading...</Link>
          </Box>
        ) : (
          <RoutineCards
            routines={routines}
          />
        )}
    </Box>
  );
}

export default Routine;