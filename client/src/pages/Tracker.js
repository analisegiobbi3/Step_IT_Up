// import package and local style sheet
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStateWithCallbackInstant, useStateWithCallbackLazy } from 'use-state-with-callback';
import { CategoryScale, LinearScale, Chart } from 'chart.js';
import LineChart from '../components/Chart';

import { QUERY_ME } from '../utils/queries'

import {
  Grid, GridItem, Box, Select,
  Input, InputGroup, InputLeftAddon,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatGroup,
  Heading,
  filter,
} from '@chakra-ui/react'

import '../styles/Tracker.css';

Chart.register(CategoryScale, LinearScale)

const Tracker = () => {
  
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

  const tracker = data?.me.tracker || [];
  const trackerDates = tracker.map(record => record.date);
  const trackerStartDate = Math.min.apply(null, trackerDates)
  const [routineSet, setRoutineSet] = useState([])

  const createRoutineSets = () => {
    let routineList = []
    for (let i = 0; i < tracker.length; i++) {
      if (tracker[i].scheduledRoutines && tracker[i].scheduledRoutines.length > 0) {
        let scheduledDate = tracker[i].date
        let scheduledRoutines = tracker[i].scheduledRoutines
        for (let k = 0; k < scheduledRoutines.length; k++) {
          routineList.push({
            date: scheduledDate, 
            routineName: scheduledRoutines[k].routineName, 
            complete: scheduledRoutines[k].complete
          })
        } 
      }
    }
    routineSet.push(routineList)
    return routineSet
  }

  const date = new Date();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const today = new Date().getTime()
  const [showDates, setShowDates] = useState(false)
  const [routineCount, setRoutineCount] = useState(0)
  const [completeCount, setCompleteCount] = useState(0)
  const [dateRange, setDateRange] = useStateWithCallbackInstant({startDate: trackerStartDate, endDate: today}, newRange => {
    if (dateRange.startDate < dateRange.endDate) {
      // const filteredScheduledRoutines = createRoutineSets().filter(routine => routine.date >= dateRange.endDate && routine.date <= dateRange.endDate);
      console.log('startDate: ' + dateRange.startDate + ' endDate: ' + dateRange.endDate)
      console.log(createRoutineSets()[0])

      let filteredList = []
      let completion = 0
      let routineList = createRoutineSets()[0]
      for (let i = 0; i < routineList.length; i++) {
        if (routineList[i].date >= dateRange.startDate && routineList[i].date <= dateRange.endDate) {
          filteredList.push({routineName: routineList[i].routineName, complete: routineList[i].complete})
          if (routineList[i].complete === true) {completion++}
        }
      }
      setRoutineCount(filteredList.length)
      setCompleteCount(completion)
    } else {
      
    }
  });

  // console.log()

  const DateRange = () => (
    <div>
      <InputGroup my='5'>
        <InputLeftAddon>Start Date</InputLeftAddon>
        <Input
          size='md'
          type='date'
          name='customStartDate'
          value={dateRange.startDate}
          onChange={(e) => {setDateRange({...dateRange, startDate: e.target.value})}}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>End Date</InputLeftAddon>
        <Input
          size='md'
          type='date'
          name='customEndDate'
          value={dateRange.endDate}
          onChange={(e) => {setDateRange({...dateRange, endDate: e.target.value})}}
        />
      </InputGroup>
    </div>
  )

  const changeView = (e) => {
    if (e === 'Custom Range') {
      setShowDates(true)
    } else {
      setShowDates(false)
    }
  };

  const handleRenderTracker = (e) => {

    if (e === 'All Time') {
      setDateRange({startDate: trackerStartDate, endDate: today})
    }

  }

  return (
    <Box className='tracker-page'>
      <Grid h='100vh' templateRows='repeat(4, 1fr)' templateColumns='repeat(10, 1fr)' gap={6} >
        <GridItem rowSpan={4} colSpan={2} >
          <Box bg='var(--shade2)' p='5' borderRadius='1rem'>
            <Select size='lg' 
            placeholder='Select View Range'
            onChange={(e) => {handleRenderTracker(e.target.value); changeView(e.target.value)}}>
              <option value='All Time'>All Time</option>
              <option value='This Year'>This Year</option>
              <option value='This Month'>This Month</option>
              <option value='This Week'>This Week</option>
              <option value='Last 30 Days'>Last 30 Days</option>
              <option value='Last 60 Days'>Last 60 Days</option>
              <option value='Last 90 Days'>Last 90 Days</option>
              <option value='Custom Range'>Custom Range</option>
            </Select>
            {showDates ? <DateRange /> : null}
          </Box>
        </GridItem>
        <GridItem colSpan={8} bg='var(--shade1)' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Routine Stats</Heading>
          <StatGroup textAlign='center' alignItems='center'>
            <Stat transform='scale(1.5)'>
              <StatLabel>Score</StatLabel>
              <StatNumber>{`${completeCount}/${routineCount}`}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Scheduled</StatLabel>
              <StatNumber>{routineCount}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Completed</StatLabel>
              <StatNumber>{completeCount}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Most Scheduled Routine</StatLabel>
              <StatNumber>30</StatNumber>
              <StatHelpText>Leg Day</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Most Completed Routine</StatLabel>
              <StatNumber>25</StatNumber>
              <StatHelpText>Arm Day</StatHelpText>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem colSpan={8} bg='papayawhip' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Calorie Trend</Heading>
          {/* <LineChart chartData={calorieData}/> */}
        </GridItem>
        <GridItem colSpan={8} bg='var(--shade2)' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Weight Trend</Heading>
          {/* <LineChart chartData={weightData}/> */}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Tracker;