// import package and local style sheet
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js";
import LineChart from "../components/Chart";

import { QUERY_CALORIES, QUERY_WEIGHT } from '../utils/queries'



import {
  Grid, GridItem, Box, Select,
  Input, InputGroup, InputLeftAddon,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatGroup,
  Heading,
} from '@chakra-ui/react'

import '../styles/Tracker.css';
import { useQuery } from "@apollo/client";


Chart.register(CategoryScale)

const Tracker = () => {

  const { register, setValue, getValues } = useForm();
  const [showDates, setShowDates] = React.useState(false)
  
  const { calorieData } = useQuery(QUERY_CALORIES)
  const { weightData } = useQuery(QUERY_WEIGHT)

  const DateRange = () => (
    <div>
      <InputGroup my='5'>
        <InputLeftAddon>Start Date</InputLeftAddon>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          {...register('startDate', { required: false })}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon>End Date</InputLeftAddon>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          {...register('endDate', { required: false })}
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

  return (
    <Box className='tracker-page'>
      <Grid h='100vh' templateRows='repeat(4, 1fr)' templateColumns='repeat(10, 1fr)' gap={6} >
        <GridItem rowSpan={4} colSpan={2} >
          <Box bg='var(--shade2)' p='5' borderRadius='1rem'>
            <Select size='lg' onChange={(e) => changeView(e.target.value)} >
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
              <StatNumber>25%</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Scheduled</StatLabel>
              <StatNumber>100</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Completed</StatLabel>
              <StatNumber>25</StatNumber>
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