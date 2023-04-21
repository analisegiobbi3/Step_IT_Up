import React, { useState } from "react";
import { Link, Form } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { Box, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react';

import { ADD_PROFILE } from "../utils/mutations";

import Auth from '../../utils/auth';

const AddProfile = () => {
  const [newAge, setNewAge] = useState(' ');
  // const [newSex, setNewSex] = useState(me.sex);
  const [newWeight, setNewWeight] = useState(' ');
  const [newHeight, setNewHeight] = useState(' ');
  const [newGoalWeight, setNewGoalWeight] = useState(' ');

    const [addProfile, { error }] = useMutation(ADD_PROFILE);

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await addProfile({
        variables: { newAge, newWeight, newHeight, newGoalWeight},
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
    return ( 
      <div>
        {Auth.loggedIn() ? (
          <>
          <Box maxW='480px'>
            <Form
        onSubmit={handleFormSubmit}
      >
        <FormControl isRequired mb='20px'>
          <FormLabel>Age</FormLabel>
          <Input 
          value={newAge}
          className = 'form-input'
          onChange={(e) => setNewAge(e.target.value)}
          />
          </FormControl>
          {/* <FormControl isRequired mb='20px'>
          <FormLabel>Birth Sex</FormLabel>
          <RadioGroup onChange={(e) => setNewSex(e.target.checked)}>
          <HStack spacing='24px'>
          Radio
          value={newSex}>
          Male
          </Radio>
          <Radio 
          value={newSex}>
          Female
          </Radio>
          <Hstack>
          </RadioGroup>
          </FormControl> */}
          <FormControl isRequired mb='20px'>
          <FormLabel>Weight</FormLabel>
          <Input
          value={newWeight}
          className='form-input'
          onChange={(e) => setNewWeight(e.target.value)}
          />
          </FormControl>
          <FormControl isRequired mb='20px'>
          <FormLabel>Height</FormLabel>
          <Input 
          value={newHeight}
          className='form-input'
          onChange={(e) => setNewHeight(e.target.value)}
          />
          </FormControl>
          <FormControl isRequired mb='20px'>
          <FormLabel>Goal Weight</FormLabel>
          <FormHelperText>If you are working on maintenance, you can enter your current weight here
            to help us personalise your experience on this app.</FormHelperText>
          <Input
          value={newGoalWeight}
          className='form-input'
          onChange={(e) => setNewGoalWeight(e.target.value)}
          />
          </FormControl>

        <div className='button'>
          <Button type="submit">save changes</Button>
        </div>
        {error && (
          <div className='danger'>
            Something went wrong..
          </div>
        )}
      </Form>
      </Box>
          </>) : (
          <p>
            You need to be logged in to view your profile. Please {' '}
            <Link to='/login'>login</Link> or <Link to="/signup">signup.</Link>
            </p>
        )}
      </div>
    )

 
  };

  export default AddProfile;