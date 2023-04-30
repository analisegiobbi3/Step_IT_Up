import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select
} from "@chakra-ui/react";

import { ADD_PROFILE } from "../utils/mutations";

import Auth from '../utils/auth';
import '../styles/Profile.css';

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
        (13.397 * (newGoalWeight/ 2.2) + (4.799 * newHeight) - (5.677 * newAge));
      setCalories(Math.round(bmr * activityLevel));
    } else {
      const bmr =
        447.593 +
        (9.247 * (newGoalWeight/ 2.2) + (3.098 * newHeight) - (4.33 * newAge));
      setCalories(Math.round(bmr * activityLevel));
    }
  };

      const { isOpen } = useDisclosure({ defaultIsOpen: true });
      const navigate = useNavigate();
      const returnToHome = () => navigate("/");


    return (
      <div>
        <Box className="profile-modal">
          <Modal isOpen={isOpen} onClose={returnToHome}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Are you ready to step it up?</ModalHeader>
              <ModalCloseButton />
              {Auth.loggedIn() ? (
                <>
                  {/* <Box maxW='480px'> */}
                  <form onSubmit={handleFormSubmit}>
                    <ModalBody>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Age</FormLabel>
                        <Input
                          value={newAge}
                          className="form-input"
                          onChange={(e) => setNewAge(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Birth Sex</FormLabel>
                        <Select
                          value={newSex}
                          onChange={(e) => setNewSex(e.target.value)}
                        >
                          <option value=' '>Please select an option</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Select>
                      </FormControl>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Height</FormLabel>
                        <FormHelperText mb="20px">(cm)</FormHelperText>
                        <Input
                          value={newHeight}
                          className="form-input"
                          onChange={(e) =>
                            setNewHeight(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Weight</FormLabel>
                        <FormHelperText mb="20px">(lbs)</FormHelperText>
                        <Input
                          value={newWeight}
                          // value={me.goalWeight}
                          className="form-input"
                          onChange={(e) =>
                            setNewWeight(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Goal Weight</FormLabel>
                        <FormHelperText mb="20px">(lbs)</FormHelperText>
                        <FormHelperText mb="20px">
                          If you are working on maintenance, you can enter your
                          current weight to help us personalise your experience
                          on this app.
                        </FormHelperText>
                        <Input
                          value={newGoalWeight}
                          className="form-input"
                          onChange={(e) =>
                            setNewGoalWeight(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormControl isRequired mb="20px">
                        <FormLabel>Activity Level</FormLabel>
                        <Select
                          defaultValue={activityLevel}
                          onChange={(e) => setActivityLevel(parseInt(e.target.value))}
                        >
                          <option value=''>Please select an option</option>
                          <option value="1.2">Sedentary</option>
                          <option value="1.375">Moderate</option>
                          <option value="1.55">High</option>
                        </Select>
                      </FormControl>
                      <FormControl mb="20px">
                        <Button
                          type="button"
                          colorScheme="facebook"
                          onClick={calculateCalories}
                          _hover={{
                            bg: "var(--shade2)",
                            color: "var(--shade6)",
                          }}
                        >
                          calculate your calorie intake
                        </Button>
                        <div className="calories">
                          {showCalories ? <p>{calories} calories/day</p> : ""}
                        </div>
                      </FormControl>
                    </ModalBody>
                    <ModalFooter>
                      <div className="button">
                        <Button
                          colorScheme="facebook"
                          mr={3}
                          onClick={returnToHome}
                          _hover={{
                            bg: "var(--shade2)",
                            color: "var(--shade6)",
                          }}
                        >
                          close
                        </Button>
                        <Button
                          bg="var(--shade1)"
                          color="white"
                          _hover={{
                            bg: "var(--shade2)",
                            color: "var(--shade6)",
                          }}
                          type="submit"
                        >
                          save
                        </Button>
                      </div>
                      {error && (
                        <div className="danger">Something went wrong..</div>
                      )}
                    </ModalFooter>
                  </form>
                  {/* </Box> */}
                </>
              ) : (
                <p>
                  You need to be logged in to view your profile. Please{" "}
                  <Link to="/login">login</Link> or{" "}
                  <Link to="/signup">signup.</Link>
                </p>
              )}
            </ModalContent>
          </Modal>
        </Box>
      </div>
    );

 
  };

  export default AddProfile;