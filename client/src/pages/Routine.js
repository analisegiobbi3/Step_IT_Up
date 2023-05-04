// import packages
import React from 'react';
import { Link } from 'react-router-dom'

// importy query
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

// import local component
import RoutineCards from '../components/RoutineCards';

// import package components
import {
  Flex, Box, Spacer, Heading, Button, Spinner,
} from '@chakra-ui/react'

// import local style sheet
import '../styles/Routine.css';

// functional component for the routines page
const Routine = () => {

  // query all data associated with the signed in user
  const { loading, data } = useQuery(QUERY_ME);

  // extract the routines from the query data
  const routines = data?.me.routines || [];

  return (
    <Box className='routine-page'>
      <Flex mb='5'>
        <Box>
          <Heading size='2xl'>My Routines</Heading>
        </Box>
        <Spacer />
        <Box>
          {/* button to create new routine, embedded with link to the createRoutines component */}
          {/* alternative, can use navigate onClick to achieve the same results */}
          <Button variant='solid' mb='5'><Link to='/routines/createRoutine'>New Routine</Link></Button>
        </Box>
      </Flex>
      {/* populate page only once data loads */}
      {loading ? (
          <Box m='auto' mb='10'>
            <Link to='/'><Spinner /> Loading...</Link>
          </Box>
        ) : (
          // populate with routineCards component once data is loaded
          // pass in the routines data from the query
          <RoutineCards
            routines={routines}
          />
        )}
    </Box>
  );
}

export default Routine;