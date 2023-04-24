// import package and local style sheet
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Select, Input, InputGroup,
  Stat, StatLabel, StatNumber,
  StatHelpText, StatArrow, StatGroup,

} from '@chakra-ui/react'

import '../styles/Tracker.css';

const Tracker = () => {

  const { register, setValue, getValues } = useForm();
  const [view, setView] = React.useState('')

  const changeView = () => {
    const view = getValues('view')
    console.log('changed')
  };

  return (
    <div className='tracker-page'>
      <InputGroup>
        <Select placeholder='View'
          onChange={changeView}
          {...register('view', { required: false })}
        >
          <option value='All Time'>All Time</option>
          <option value='This Year'>This Year</option>
          <option value='This Month'>This Month</option>
          <option value='This Week'>This Week</option>
          <option value='Last 30 Days'>Last 30 Days</option>
          <option value='Last 60 Days'>Last 60 Days</option>
          <option value='Last 90 Days'>Last 90 Days</option>
          <option value='Custom Range'>Custom Range</option>
        </Select>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          {...register('startDate', { required: false })}
        />
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          {...register('endDate', { required: false })}
        />
      </InputGroup>
      <Input
          size="md"
          value={view}
          onChange={setView}
      />
      <StatGroup>
        <Stat>
          <StatLabel>Sent</StatLabel>
          <StatNumber>345,670</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Clicked</StatLabel>
          <StatNumber>45</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </div>
  );
}

export default Tracker;