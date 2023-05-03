// import package
import React, { useState } from 'react';
import { useStateWithCallbackInstant } from 'use-state-with-callback';

// import queries
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'

// import local component
import LineGraph from '../components/LineGraph';

// import package components
import {
  Grid, GridItem, Box, Select,
  Input, InputGroup, InputLeftAddon,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatGroup,
  Heading, Text
} from '@chakra-ui/react'

// import local style sheet
import '../styles/Tracker.css';

// functional component for the tracker page
const Tracker = () => {

  // emulates a fetch (useQuery expects a Promise)
  // used to re-query data and re-render page on event listener/change
  const emulateFetch = _ => {
    return new Promise(resolve => {
      resolve([{ data: 'ok' }]);
    });
  };

  // query all data associated with the signed in user
  const { loading, data, refetch } = useQuery(QUERY_ME, emulateFetch, {
    refetchOnWindowFocus: false,
    // enabled set to true allows query to run on page initialization
    enabled: true
  });

  // extract the tracker information from the query data
  const tracker = data?.me.tracker || [];

  // map though the tracker data and extract the dates
  const trackerDates = tracker.map(record => record.date);
  // define the tracker start date by taking the minimum time value from the array of trackerDates
  const trackerStartDate = Math.min.apply(null, trackerDates)
  // define empty arrays that will store data based on query
  const [routineSet, setRoutineSet] = useState([])
  const [weightSet, setWeightSet] = useState([])
  const [calorieSet, setCalorieSet] = useState([])
  // define routinesPlanned count, default to 0 at start
  const [routinesPlanned, setRoutinesPlanned] = useState(0)

  // create an array of all routines in the tracker for the user
  // aggregate data so that the final array output will be: [...{date, routineName, complete}]
  const createRoutineSets = () => {
    // define empty array used to store loop data
    let routineList = []
    // loop through the tracker data
    for (let i = 0; i < tracker.length; i++) {
      // if the tracked data has scheduled routines
      if (tracker[i].scheduledRoutines && tracker[i].scheduledRoutines.length > 0) {
        // define the data date and scheduled routines
        let scheduledDate = tracker[i].date
        let scheduledRoutines = tracker[i].scheduledRoutines
        // loop through all scheduled routines for that day
        for (let k = 0; k < scheduledRoutines.length; k++) {
          // push data into the routineList array
          routineList.push({
            date: scheduledDate,
            routineName: scheduledRoutines[k].routineName,
            complete: scheduledRoutines[k].complete
          })
        }
      }
    }
    // push the entire routineList into the routineSet state
    routineSet.push(routineList)
    // output the routineSet
    return routineSet
  }

  // create an array of all weight records in the tracker for the user
  // aggregate data so that the final array output will be: [...{date, weight}]
  const createWeightTrend = () => {
    // define empty array used to store loop data
    let weightList = []
    // loop through the tracker data
    for (let i = 0; i < tracker.length; i++) {
      // if the tracked data has weight record
      if (tracker[i].weight !== null && tracker[i].weight !== 0) {
        // push data into the weightList array
        weightList.push({
          date: tracker[i].date,
          data: tracker[i].weight
        })
      }
    }
    // output the weightList
    return weightList
  }

  // create an array of all calorie records in the tracker for the user
  // aggregate data so that the final array output will be: [...{date, calorie}]
  const createCalorieTrend = () => {
    // define empty array used to store loop data
    let calorieList = []
    // loop through the tracker data
    for (let i = 0; i < tracker.length; i++) {
      // if the tracked data has calorie record
      if (tracker[i].calorie !== null && tracker[i].calorie !== 0) {
        // push data into the calorieList array
        calorieList.push({
          date: tracker[i].date,
          data: tracker[i].calorie
        })
      }
    }
    // output the calorieList
    return calorieList
  }

  // define today's date
  const date = new Date();
  // define today's date in milliseconds
  const today = new Date().getTime()
  // determine if custom date section is displayed, default false
  const [showDates, setShowDates] = useState(false)
  // define routine stat values, default start at 0
  const [routineCount, setRoutineCount] = useState(0)
  const [completeCount, setCompleteCount] = useState(0)
  const [percentComplete, setPercentComplete] = useState(0)
  // define if a date range has been selected to display tracked data
  const [rangeSelected, setRangeSelected] = useState(false);
  // define error message if invalid date is selected, default empty
  const [dateError, setDateError] = useState('')
  // set the custom date range if applicable, default start date and end date to start and end of current month
  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date(date.getFullYear(), date.getMonth(), 1).toISOString().substring(0, 10),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().substring(0, 10)
  })
  // set the date range to evaluate and display data at callback, default range of tracked data (to today)
  const [dateRange, setDateRange] = useStateWithCallbackInstant({ startDate: trackerStartDate, endDate: today }, newRange => {
    // if the date range is valid (the end date is not before the start date)
    if (dateRange.startDate <= dateRange.endDate) {
      // define empty array used to store filtered routine data
      let filteredRoutinesList = []
      // define count of completed routines, default start 0
      let completion = 0
      // define count of future scheduled routines, default start 0
      let futureRoutines = 0
      // call function and define the routine set that will be filtered
      let routineList = createRoutineSets()[0]
      // loop though the routine list
      for (let i = 0; i < routineList.length; i++) {
        // if the routine date is great than or equal to today, increment futureRoutines count by 1
        if (routineList[i].date >= today) { futureRoutines++ }
        // if the routine date is within the date range
        if (routineList[i].date >= dateRange.startDate && routineList[i].date <= dateRange.endDate) {
          // push the routine name and completion status to the filteredRoutineList array
          filteredRoutinesList.push({ routineName: routineList[i].routineName, complete: routineList[i].complete })
          // if the routine is complete, increment completion count by 1
          if (routineList[i].complete === true) { completion++ }
        }
      }

      // define empty array used to store filtered weight data
      let filteredWeightList = []
      // call function and define the weight set that will be filtered
      let weightTrend = createWeightTrend()
      // loop through the weight list
      for (let j = 0; j < weightTrend.length; j++) {
        // if the date of the recorded weght is within the date range
        if (weightTrend[j].date >= dateRange.startDate && weightTrend[j].date <= dateRange.endDate) {
          // push the weight date and data to the filteredWeightList array
          // define data as x,y data points used to plot in graph
          filteredWeightList.push({ x: weightTrend[j].date, y: weightTrend[j].data })
        }
      }

      // define empty array used to store filtered calorie data
      let filteredCalorieList = []
      // call function and define the calorie set that will be filtered
      let calorieTrend = createCalorieTrend()
      // loop through the calorie list
      for (let k = 0; k < calorieTrend.length; k++) {
        // if the date of the recorded calorie is within the date range
        if (calorieTrend[k].date >= dateRange.startDate && calorieTrend[k].date <= dateRange.endDate) {
          // push the weight date and data to the filteredCalorieList array
          // define data as x,y data points used to plot in graph
          filteredCalorieList.push({ x: calorieTrend[k].date, y: calorieTrend[k].data })
        }
      }

      // clear any exist data in the weight and calorie sets
      weightSet.length=0
      calorieSet.length=0
      // push the new filtered arrays into the respective sets, sort data from oldest to newest (for graph plotting)
      weightSet.push(filteredWeightList.sort((a, b) => parseFloat(a.x) - parseFloat(b.x)))
      calorieSet.push(filteredCalorieList.sort((a, b) => parseFloat(a.x) - parseFloat(b.x)))
      // set the total routine to the length of the filteredRoutineList array
      // subtract the futureRoutines in account for the percentComplete calculation
      setRoutineCount(filteredRoutinesList.length-futureRoutines)
      // set future routine and completion count
      setRoutinesPlanned(futureRoutines)
      setCompleteCount(completion)
      // compute and set the percentage of completion
      setPercentComplete(((completeCount / routineCount) * 100).toFixed(2))
      // set range selected to true to display computed results
      setRangeSelected(true)
      // clear error message
      setDateError('')
      // re-render the page with the updated filtered data
      refetch();
    } else {
      // if selected date range is invalid, hide the data display
      setRangeSelected(false)
      // set and display the error message
      setDateError('Invalid date range')
    }
  });

  // function to style the color of the percent completion
  const percentColor = () => {
    // less than 60%=red, less than 80%=yellow, above 80%=green
    if (percentComplete <= 60) {
      return 'red'
    } else if (percentComplete <= 80) {
      return 'yellow'
    } else if (percentComplete <= 100) {
      return 'green'
    }
  }

  // component displayed if custom date is selected
  const DateRange = () => (
    <div>
      {/* input type=date, set date value, and call formatCustomDate on change */}
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
      {/* error message display */}
      <Text mt='2' color='red'>{dateError}</Text>
    </div>
  )

  // based on selected date range, show or hide the custom date inputs
  const changeView = (e) => {
    if (e === 'Custom Range') {
      setShowDates(true)
    } else {
      setShowDates(false)
    }
  };

  // if custom date is changed
  const formatCustomDate = (event) => {
    event.preventDefault();
    // define paramenters from event target
    const { name, value } = event.target

    // based on the input name, set dateRange and customDateRange
    if (name === 'customStartDate') {
      setDateRange({ ...dateRange, startDate: new Date(value).getTime() })
      setCustomDateRange({ ...customDateRange, startDate: value })
    } else if (name === 'customEndDate') {
      setDateRange({ ...dateRange, endDate: new Date(value).getTime() })
      setCustomDateRange({ ...customDateRange, endDate: value })
    }
  };

  // function called after selecting a view range
  const handleRenderTracker = (e) => {
    // set start and end date based on selected view range
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
            {/* select field to set date range or show custom date range fields */}
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
            {/* if custom date range is selected, show the input fields */}
            {showDates ? <DateRange /> : null}
          </Box>
        </GridItem>
        <GridItem colSpan={8} bg='var(--shade1)' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Routine Stats</Heading>
          {/* if date range has been selected, display the computed data */}
          {rangeSelected ? (
            <StatGroup textAlign='center' alignItems='center' mb='5'>
              <Stat transform='scale(2)'>
                <StatLabel>Score</StatLabel>
                {/* value for percentComple and color determined by returned percentColor function */}
                <StatNumber color={percentColor}>{percentComplete}%</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Completed</StatLabel>
                {/* value for completeCount */}
                <StatNumber>{completeCount}</StatNumber>
                <StatHelpText>Routines</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Scheduled</StatLabel>
                {/* value for routine count */}
                <StatNumber>{routineCount}</StatNumber>
                <StatHelpText>Routines</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Planned</StatLabel>
                {/* value for routine planned count */}
                <StatNumber>{routinesPlanned}</StatNumber>
                <StatHelpText>Routines</StatHelpText>
              </Stat>
              {/* potential future work: */}
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
          {/* if the date range is selected, display the weight graph */}
          {rangeSelected ? (
            // graph component, pass in date range and corresponding graph data
            // weight boolean used to determine which graph options/styling to use
            <LineGraph startDate={dateRange.startDate} endDate={dateRange.endDate} weight={true} graphData={weightSet} />
          ) : (
            <Box></Box>
          )}
        </GridItem>
        <GridItem colSpan={8} bg='var(--shade2)' p='5' borderRadius='1rem'>
          <Heading size='lg' textTransform='uppercase' mb='5'>Calorie Trend</Heading>
          {/* if the date range is selected, display the calorie graph */}
          {rangeSelected ? (
            // graph component, pass in date range and corresponding graph data
            // weight boolean used to determine which graph options/styling to use
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