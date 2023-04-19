// import package and local style sheet
import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { 
  Grid, GridItem, 
  Card, CardHeader, CardBody, CardFooter, 
  Heading, Stack, StackDivider, Box, Spacer,
  Flex, Text , Button, IconButton, Checkbox,
  NumberInput, NumberInputField 
} from '@chakra-ui/react'

import { CgRemoveR } from "react-icons/cg";
import { GrFormAdd } from "react-icons/gr";

import '../styles/Calendar.css';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());

  return (
    <Grid className= 'calendar-page' templateColumns='repeat(10, 1fr)' gap={6}>
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
                    <Button colorScheme='facebook' size='lg'>Add</Button>
                  </Box>
                </Flex>
                {/* duplicate this section for routines */}
                <Text fontSize='sm'>
                  <IconButton variant='solid' colorScheme='facebook' aria-label='Remove Circle' size='sm' mr='5' icon={<CgRemoveR />}/>
                  <Checkbox size='lg' colorScheme='green'>
                    Routine 1 
                  </Checkbox>
                </Text>
                {/* end of section */}
              </Box>
              <Box>
                <Flex>
                  <Box>
                    <Heading size='lg' textTransform='uppercase' mb='5'>Calories</Heading>
                  </Box>
                  <Spacer />
                  <Box>
                    <Button colorScheme='facebook' size='lg'>Update</Button>
                  </Box>
                </Flex>
                <Flex alignItems='center'>
                  <Text pt='2' fontSize='lg' mr='4'>45000</Text>
                  < GrFormAdd/>
                  <NumberInput size='sm' ml='5'>
                    <NumberInputField />
                  </NumberInput>
                </Flex>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

