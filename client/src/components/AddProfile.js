import React, { useState } from "react";
import { Link, Form } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { Box, FormControl, FormLabel, Input, FormHelperText, Button, Radio, RadioGroup, HStack } from '@chakra-ui/react';

import { ADD_PROFILE } from "../utils/mutations";

import Auth from '../utils/auth';

const AddProfile = () => {
  const [newAge, setNewAge] = useState(' ');
  const [newSex, setNewSex] = useState(' ');
  const [newWeight, setNewWeight] = useState(' ');
  const [newHeight, setNewHeight] = useState(' ');
  const [newGoalWeight, setNewGoalWeight] = useState(' ');

    const [addProfile, { error }] = useMutation(ADD_PROFILE);

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newAge, newGoalWeight, newSex, newWeight, newHeight);

    try{
      const { data } = await addProfile({
        variables: { newAge, newSex, newWeight, newHeight, newGoalWeight},
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
            {/* <Box maxW='480px'> */}
            <form onSubmit={handleFormSubmit}>
              {/* <FormControl isRequired mb='20px'> */}
              <label>Age</label>
              <input
                value={newAge}
                className="form-input"
                onChange={(e) => setNewAge(parseInt(e.target.value))}
              />
              {/* </FormControl> */}
              {/* <FormControl isRequired mb='20px'> */}
              <label>Birth Sex</label>
              {/* <RadioGroup onChange={(e) => setNewSex(e.target.value)}>
          <HStack spacing='24px'>
          <Radio
          value='Male'>
          Male
          </Radio>
          <Radio 
          value='Female'>
          Female
          </Radio>
          </HStack>
          </RadioGroup> */}
              {/* </FormControl> */}
              {/* <FormControl isRequired mb='20px'> */}
              <input
                value={newSex}
                className="form-input"
                onChange={(e) => setNewSex(e.target.value)}
              />
              <label>Weight</label>
              <input
                value={newWeight}
                className="form-input"
                onChange={(e) => setNewWeight(parseInt(e.target.value))}
              />
              {/* </FormControl> */}
              {/* <FormControl isRequired mb='20px'> */}
              <label>Height</label>
              <input
                value={newHeight}
                className="form-input"
                onChange={(e) => setNewHeight(parseInt(e.target.value))}
              />
              {/* </FormControl> */}
              {/* <FormControl isRequired mb='20px'> */}
              <label>Goal Weight</label>
              {/* <FormHelperText>If you are working on maintenance, you can enter your current weight here
            to help us personalise your experience on this app.</FormHelperText> */}
              <input
                value={newGoalWeight}
                className="form-input"
                onChange={(e) => setNewGoalWeight(parseInt(e.target.value))}
              />
              {/* </FormControl> */}

              <div className="button">
                <button type="submit">save changes</button>
              </div>
              {error && <div className="danger">Something went wrong..</div>}
            </form>
            {/* </Box> */}
          </>
        ) : (
          <p>
            You need to be logged in to view your profile. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );

 
  };

  export default AddProfile;