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
  const [activityLevel, setActivityLevel] = useState(' ');
  const [calories, setCalories] = useState(' ');
  const [showCalories, setShowCalories] = useState(false);

    const [addProfile, { error }] = useMutation(ADD_PROFILE);

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newAge, newGoalWeight, newSex, newWeight, newHeight);

    try{
      const { data } = await addProfile({
        variables: { newAge, newSex, newWeight, newHeight, newGoalWeight, activityLevel, calories},
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  const calculateCalories = () => {
    setShowCalories(true);
    if (newSex === "Male") {
      const bmr =
        88.362 +
        (13.397 * (newGoalWeight * 2.2) + 4.799 * newHeight - 5.677 * newAge);
      setCalories(bmr * activityLevel);
    } else {
      const bmr =
        447.593 +
        (9.247 * (newGoalWeight * 2.2) + 3.098 * newHeight - 4.33 * newAge);
      setCalories(bmr * activityLevel);
    }
  };
    return (
      <div>
        {Auth.loggedIn() ? (
          <>
            {/* <Box maxW='480px'> */}
            <form onSubmit={handleFormSubmit}>
              {/* <FormControl isRequired mb='20px'> */}
              <label>Age</label>
              <input
                defaultValue={newAge}
                className="form-input"
                onChange={(e) => setNewAge(parseInt(e.target.value))}
              />
              <label>Height</label>
              <input
                defaultValue={newHeight}
                className="form-input"
                onChange={(e) => setNewHeight(parseInt(e.target.value))}
              />
              {/* </FormControl> */}
              {/* <FormControl isRequired mb='20px'> */}
              <label>Birth Sex</label>
              <select value={newSex} onChange={(e) => setNewSex(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label>Weight</label>
              <input
                defaultValue={newWeight}
                // value={me.goalWeight}
                className="form-input"
                onChange={(e) => setNewWeight(parseInt(e.target.value))}
              />
              <label>Goal Weight</label>
              {/* <FormHelperText>If you are working on maintenance, you can enter your current weight here
            to help us personalise your experience on this app.</FormHelperText> */}
              <input
                defaultValue={newGoalWeight}
                className="form-input"
                onChange={(e) => setNewGoalWeight(parseInt(e.target.value))}
              />
              {/* </FormControl> */}
              <label>Activity Level</label>
              <select
                defaultValue={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="1.375">Sedentary</option>
                <option value="1.55">Moderate</option>
                <option value="1.9">High</option>
              </select>
              <button onClick={calculateCalories}>
                Calculate your calorie intake according to your goal weight
              </button>
              <div>{showCalories ? <p>{calories}</p> : ""}</div>
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