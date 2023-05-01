// import package and local style sheet
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStateWithCallbackInstant, useStateWithCallbackLazy } from 'use-state-with-callback';
import { CategoryScale, LinearScale, Chart } from 'chart.js';
import LineGraph from '../components/LineGraph';
import { Line } from 'react-chartjs-2';

import { QUERY_ME } from '../utils/queries'

import {
  Grid, GridItem, Box, Select,
  Input, InputGroup, InputLeftAddon,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatGroup,
  Heading, Text
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
  const [weightSet, setWeightSet] = useState([])
  const [calorieSet, setCalorieSet] = useState([])

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

  const createWeightTrend = () => {
    let weightList = []
    for (let i = 0; i < tracker.length; i++) {
      if (tracker[i].weight !== null && tracker[i].weight !== 0) {
        weightList.push({
          date: tracker[i].date,
          data: tracker[i].weight
        })
      }
    }
    return weightList
  }

  const createCalorieTrend = () => {
    let calorieList = []
    for (let i = 0; i < tracker.length; i++) {
      if (tracker[i].calorie !== null && tracker[i].calorie !== 0) {
        calorieList.push({
          date: tracker[i].date,
          data: tracker[i].calorie
        })
      }
    }
    return calorieList
  }

  const date = new Date();
  const today = new Date().getTime()
  const [showDates, setShowDates] = useState(false)
  const [routineCount, setRoutineCount] = useState(0)
  const [completeCount, setCompleteCount] = useState(0)
  const [percentComplete, setPercentComplete] = useState(0)
  const [rangeSelected, setRangeSelected] = useState(false);
  const [dateError, setDateError] = useState('')

  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10)
  })

  const [dateRange, setDateRange] = useStateWithCallbackInstant({ startDate: trackerStartDate, endDate: today }, newRange => {
    if (dateRange.startDate <= dateRange.endDate) {
      let filteredRoutinesList = []
      let completion = 0
      let routineList = createRoutineSets()[0]
      for (let i = 0; i < routineList.length; i++) {
        if (routineList[i].date >= dateRange.startDate && routineList[i].date <= dateRange.endDate) {
          filteredRoutinesList.push({ routineName: routineList[i].routineName, complete: routineList[i].complete })
          if (routineList[i].complete === true) { completion++ }
        }
      }

      let filteredWeightList = []
      let weightTrend = createWeightTrend()
      for (let j = 0; j < createWeightTrend().length; j++) {
        if (weightTrend[j].date >= dateRange.startDate && weightTrend[j].date <= dateRange.endDate) {
          filteredWeightList.push({ x: weightTrend[j].date, y: weightTrend[j].data })
        }
      }

      let filteredCalorieList = []
      let calorieTrend = createCalorieTrend()
      for (let k = 0; k < createCalorieTrend().length; k++) {
        if (calorieTrend[k].date >= dateRange.startDate && calorieTrend[k].date <= dateRange.endDate) {
          filteredCalorieList.push({ x: calorieTrend[k].date, y: calorieTrend[k].data })
        }
      }

      weightSet.length=0
      calorieSet.length=0
      weightSet.push(filteredWeightList.sort((a, b) => parseFloat(a.x) - parseFloat(b.x)))
      calorieSet.push(filteredCalorieList.sort((a, b) => parseFloat(a.x) - parseFloat(b.x)))
      setRoutineCount(filteredRoutinesList.length)
      setCompleteCount(completion)
      setPercentComplete(((completeCount / routineCount) * 100).toFixed(2))
      setRangeSelected(true)
      setDateError('')
      refetch();
    } else {
      setRangeSelected(false)
      setDateError('Invalid date range')
    }
  });

  const DateRange = () => (
    <div>
      <InputGroup my='5'>
        <InputLeftAddon>Start Date</InputLeftAddon>
        <Input
          size='md'
          type='date'
          name='customStartDate'
          value={customDateRange.startDate}
          onChange={formatCustomDate}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>End Date</InputLeftAddon>
        <Input
          size='md'
          type='date'
          name='customEndDate'
          value={customDateRange.endDate}
          onChange={formatCustomDate}
        />
      </InputGroup>
      <Text mt='2' color='red'>{dateError}</Text>
    </div>
  )

  const changeView = (e) => {
    if (e === 'Custom Range') {
      setShowDates(true)
    } else {
      setShowDates(false)
    }
  };

  const formatCustomDate = (event) => {
    event.preventDefault();
    const { name, value } = event.target

    if (name === 'customStartDate') {
      setDateRange({ ...dateRange, startDate: new Date(value).getTime() })
      setCustomDateRange({ ...customDateRange, startDate: value })
    } else if (name === 'customEndDate') {
      setDateRange({ ...dateRange, endDate: new Date(value).getTime() })
      setCustomDateRange({ ...customDateRange, endDate: value })
    }
  };

  const handleRenderTracker = (e) => {
    if (e === 'All Time') {
      setDateRange({
        startDate: trackerStartDate,
        endDate: today
      })
    }
    if (e === 'This Year') {
      setDateRange({
        startDate: new Date(new Date().getFullYear(), 0, 1).getTime(),
        endDate: new Date(new Date().getFullYear() + 1, 0, 0).getTime()
      })
    }
    if (e === 'This Month' || e === 'Custom Range') {
      setDateRange({
        startDate: new Date(date.getFullYear(), date.getMonth(), 1).getTime(),
        endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
      })
    }
    if (e === 'Last 30 Days') {
      setDateRange({
        startDate: new Date(date.getFullYear(), date.getMonth(), date.getDay() - 30).getTime(),
        endDate: today
      })
    }
    if (e === 'Last 60 Days') {
      setDateRange({
        startDate: new Date(new Date().getFullYear(), date.getMonth(), date.getDay() - 60).getTime(),
        endDate: today
      })
    }
    if (e === 'Last 90 Days') {
      setDateRange({
        startDate: new Date(new Date().getFullYear(), date.getMonth(), date.getDay() - 90).getTime(),
        endDate: today
      })
    }
  }

  return (
    <Box className='tracker-page' height='fit-content'>
      <Grid h='100vh' templateRows='repeat(4, 1fr)' templateColumns='repeat(10, 1fr)' gap={6} >
        <GridItem rowSpan={4} colSpan={2} >
          <Box bg='var(--shade2)' p='5' borderRadius='1rem'>
            <Select size='lg'
              placeholder='Select View Range'
              onChange={(e) => { handleRenderTracker(e.target.value); changeView(e.target.value) }}>
              <option value='All Time'>All Time</option>
              <option value='This Year'>This Year</option>
              <option value='This Month'>This Month</option>
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
          {rangeSelected ? (
            <StatGroup textAlign='center' alignItems='center' mb='5'>
              <Stat transform='scale(1.5)'>
                <StatLabel>Score</StatLabel>
                <StatNumber>{percentComplete}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Completed</StatLabel>
                <StatNumber>{completeCount}</StatNumber>
                <StatHelpText>Routines</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Scheduled</StatLabel>
                <StatNumber>{routineCount}</StatNumber>
                <StatHelpText>Routines</StatHelpText>
              </Stat>
              {/* <Stat>
                <StatLabel>Most Scheduled Routine</StatLabel>
                <StatNumber>30</StatNumber>
                <StatHelpText>Leg Day</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Most Completed Routine</StatLabel>
                <StatNumber>25</StatNumber>
                <StatHelpText>Arm Day</StatHelpText>
              </Stat> */}
            </StatGroup>
          ) : (
            <Box></Box>
          )}
        </GridItem>
        <GridItem colSpan={8} bg='papayawhip' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Weight Trend</Heading>
          {rangeSelected ? (
            <LineGraph startDate={dateRange.startDate} endDate={dateRange.endDate} weight={true} graphData={weightSet} />
          ) : (
            <Box></Box>
          )}
        </GridItem>
        <GridItem colSpan={8} bg='var(--shade2)' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Calorie Trend</Heading>
          {rangeSelected ? (
            <LineGraph startDate={dateRange.startDate} endDate={dateRange.endDate} weight={false} graphData={calorieSet} />
          ) : (
            <Box></Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default Tracker;