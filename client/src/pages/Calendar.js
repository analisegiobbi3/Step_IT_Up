// import package and local style sheet
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useStateWithCallbackInstant, useStateWithCallbackLazy } from 'use-state-with-callback';

import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { ADD_TRACKER, REMOVE_TRACKER } from '../utils/mutations';

import CalendarList from '../components/CalendarList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

import {
  Grid, GridItem, Box, Spacer,
  IconButton, Spinner, Text, Input,
  Card, CardHeader, CardBody,
} from '@chakra-ui/react'

import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';

const CalendarPage = () => {
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

  const trackedDates = tracker.map(({ date }) => date)
  const checkTrackHistory = (d) => {
    return d == dateTime;
  }

  const [showList, setShowList] = useState(false);
  const [trackerIndex, setTrackerIndex] = useStateWithCallbackLazy(false);
  const [tracked, setTracked] = useStateWithCallbackLazy(false)

  const [date, setDate] = useStateWithCallbackInstant(new Date(localStorage.getItem('storedDate')).getTime() || new Date().getTime(), newDate => {
    if (trackedDates.find(checkTrackHistory)) {
      setTrackerIndex(tracker.findIndex(x => x.date == dateTime))
      setTracked(true)
    } else {
      setTrackerIndex('')
      setTracked(false)
    }
    localStorage.setItem('storedDate', date);
  });

  const dateTime = new Date(date).getTime()

  const handleChangeDate = (e) => {
    setShowList(true)
    setTracked(false)
    setDate(e)
  };

  const [addTracker, { addTrackerData }] = useMutation(ADD_TRACKER);

  const handleAddTracker = async (event) => {
    event.preventDefault();

    try {
      const { addTrackerData } = await addTracker({
        variables: { date: date },
      });

      localStorage.setItem('storedDate', date);
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  const [removeTracker, { removeTrackerData }] = useMutation(REMOVE_TRACKER);

  const handleRemoveTracker = async (event) => {
    event.preventDefault();

    try {
      const { removeTrackerData } = await removeTracker({
        variables: { trackerId: tracker[trackerIndex]._id },
      });

      setShowList(false)
      setTracked(false)
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className='calendar-page'>
      <Grid templateColumns='repeat(10, 1fr)' gap={6}>
        <GridItem colSpan={5}>
          <div className='calendar'>
            <div className='calendar-container'>
              <Calendar
                onChange={handleChangeDate}
                value={new Date(date)}
                calendarType='US' />
            </div>
          </div>
        </GridItem>
        <GridItem colSpan={5}>
          {showList ? (<Card>
            <CardHeader display='flex' justifyContent='space-between'>
              <Box>
                <Input size='lg' textTransform='uppercase' value={date.toDateString()} />
              </Box>
              <Spacer />
              {tracked ? (
                <Box m='auto' mb='10' display='flex' alignItems='center'>
                  <Text>Remove tracked history for this day.</Text>
                  <IconButton bg='var(--shade5)' color='white' ml='3' size='md' icon={<FiMinusSquare />} onClick={handleRemoveTracker} />
                </Box>
              ) : (
                <Box m='auto' mb='10' display='flex' alignItems='center'>
                  <Text>No tracking history, start tracking?</Text>
                  <IconButton bg='var(--shade5)' color='white' ml='3' size='md' icon={<FiPlusSquare />} onClick={handleAddTracker} />
                </Box>
              )}
            </CardHeader>
            <CardBody>
              {tracked ? (
                <Box>
                  {loading ? (
                    <Box m='auto' mb='10'>
                      <Link to='/'><Spinner /> Loading...</Link>
                    </Box>
                  ) : (
                    <CalendarList
                      trackerIndex={trackerIndex}
                    />
                  )}
                </Box>
              ) : (
                <Box></Box>
              )}
            </CardBody>
          </Card>
          ) : (
            <Box></Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default CalendarPage;