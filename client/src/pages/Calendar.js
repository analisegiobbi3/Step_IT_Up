// import packages
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useStateWithCallbackInstant, useStateWithCallbackLazy } from 'use-state-with-callback';

// import queries and mutations
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from '../utils/queries';
import { ADD_TRACKER, REMOVE_TRACKER } from '../utils/mutations';

// import local components/stylesheet and pacakge components/stylesheet
import CalendarList from '../components/CalendarList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

// import package components and icons
import {
  Grid, GridItem, Box, Spacer,
  IconButton, Spinner, Text, Input,
  Card, CardHeader, CardBody,
} from '@chakra-ui/react'

import { FiPlusSquare, FiMinusSquare } from 'react-icons/fi';


// functional component for the calendar page
const CalendarPage = () => {

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
  // used to cross check existing data with selected data to determine display of the list of tracking information
  const trackedDates = tracker.map(({ date }) => date)

  // function to set convert new date and pass in to find in trackedDates
  const checkTrackHistory = (d) => {
    return d == dateTime;
  }

  // set if the card with date and list is displayed, false on initialization
  // only setting the card header (date and add/remove tracker button), not the card body information
  const [showList, setShowList] = useState(false);

  // set if the card body (tracker CRUD) is displayed, false on initialization
  const [tracked, setTracked] = useStateWithCallbackLazy(false)

  // set the index of the tracker to exact information from (only if it exist)
  const [trackerIndex, setTrackerIndex] = useStateWithCallbackLazy(false);

  // set state and instantly run the callback functions
  // if a storedDate exist in local storage, set it as the initial date on render, otherwise, set it to today's date
  // all dates stored in millisecond (.getTime()) format for consistency and match functions
  const [date, setDate] = useStateWithCallbackInstant(new Date(localStorage.getItem('storedDate')).getTime() || new Date().getTime(), newDate => {
    // right after the date changes, check if the new date exist in the trackedDates array
    if (trackedDates.find(checkTrackHistory)) {
      // find and set the index of the tracker where the date equals the selected date
      setTrackerIndex(tracker.findIndex(x => x.date == dateTime))
      // set tracked to true to display the tracking list
      setTracked(true)
    } else {
      // clear the trackerIndex
      setTrackerIndex('')
      // hide the tracking list
      setTracked(false)
    }
    // set the storedDate in the local storage as the current selected day
    localStorage.setItem('storedDate', date);
  });

  // define the millisecond conversion of the selected date
  const dateTime = new Date(date).getTime()

  // on date change (on the calendar)
  const handleChangeDate = (e) => {
    // show the card header (only changed once on initialization)
    setShowList(true)
    // hide the tracked list initially, if tracked, it will set to true in setDate callback
    setTracked(false)
    // setDate to new date with callbacks
    setDate(e)
  };

  // mutation to add tracker
  const [addTracker, { addTrackerData }] = useMutation(ADD_TRACKER);

  // function to add tracker on click
  const handleAddTracker = async (event) => {
    event.preventDefault();

    try {
      const { addTrackerData } = await addTracker({
        // pass in the selected date to add new tracking data
        variables: { date: date },
      });

      // set the storedDare in the local storage to the new date
      localStorage.setItem('storedDate', date);

      // re-render the components to show the tracking list
      refetch();
    } catch (e) {
      console.error(e);
    }
  };

  // mutation to remove tracker
  const [removeTracker, { removeTrackerData }] = useMutation(REMOVE_TRACKER);

  // function to remove tracker on click
  const handleRemoveTracker = async (event) => {
    event.preventDefault();

    try {
      const { removeTrackerData } = await removeTracker({
        // pass in the trackerId of the current selected date
        variables: { trackerId: tracker[trackerIndex]._id },
      });

      // hide the tracking list
      setShowList(false)
      setTracked(false)
      // re-render the components to hide the tracking list
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
              {/* react calendar component */}
              <Calendar
                onChange={handleChangeDate}
                value={new Date(date)}
                calendarType='US' />
            </div>
          </div>
        </GridItem>
        <GridItem colSpan={5}>
          {showList ? (
            <Card>
              <CardHeader display='flex' justifyContent='space-between'>
                <Box>
                  {/* header with selected date in string format */}
                  <Input size='lg' textTransform='uppercase' value={date.toDateString()} />
                </Box>
                <Spacer />
                {/* if date is tracked */}
                {tracked ? (
                  // show the remove tracker button with onClick eventlistener
                  <Box m='auto' mb='10' display='flex' alignItems='center'>
                    <Text>Remove tracked history for this day.</Text>
                    <IconButton bg='var(--shade5)' color='white' ml='3' size='md' icon={<FiMinusSquare />} onClick={handleRemoveTracker} />
                  </Box>
                ) : (
                  // show the add tracker button with onClick eventlistener
                  <Box m='auto' mb='10' display='flex' alignItems='center'>
                    <Text>No tracking history, start tracking?</Text>
                    <IconButton bg='var(--shade5)' color='white' ml='3' size='md' icon={<FiPlusSquare />} onClick={handleAddTracker} />
                  </Box>
                )}
              </CardHeader>
              <CardBody>
                {/* if tracked and query is complete */}
                {tracked ? (
                  <Box>
                    {/* query is not complete */}
                    {loading ? (
                      <Box m='auto' mb='10'>
                        <Link to='/'><Spinner /> Loading...</Link>
                      </Box>
                    ) : (
                      // date is tracked and query is complete, render the CalendarList component
                      // pass in the index of interest
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