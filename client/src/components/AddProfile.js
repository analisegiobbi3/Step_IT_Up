import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box, Input, Button, Select, SimpleGrid,
  FormControl, FormLabel, FormHelperText,
  Modal, ModalContent, ModalHeader, ModalOverlay,
  ModalCloseButton, ModalBody, ModalFooter,
  useDisclosure,
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

    try {
      const { data } = await addProfile({
        variables: { newAge, newSex, newWeight, newHeight, newGoalWeight, activityLevel, calories },
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
        (13.397 * (newGoalWeight / 2.2) + (4.799 * newHeight) - (5.677 * newAge));
      setCalories(Math.round(bmr * activityLevel));
    } else {
      const bmr =
        447.593 +
        (9.247 * (newGoalWeight / 2.2) + (3.098 * newHeight) - (4.33 * newAge));
      setCalories(Math.round(bmr * activityLevel));
    }
  };

  const { isOpen } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();
  const returnToHome = () => navigate("/");


  return (
      <Box className="profile-modal">
        <Modal isOpen={isOpen} onClose={returnToHome} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color='var(--shade5)' fontSize='2vw'>Are you ready to Step It Up?</ModalHeader>
            <ModalCloseButton />
            {Auth.loggedIn() ? (
              <>
                <form onSubmit={handleFormSubmit}>
                  <ModalBody>
                    <SimpleGrid columns={2} spacing={5}>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Age </FormLabel>
                          <Input
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            value={newAge}
                            className="form-input"
                            onChange={(e) => setNewAge(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Birth Sex </FormLabel>
                          <Select
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            placeholder='Select Option'
                            value={newSex}
                            onChange={(e) => setNewSex(e.target.value)}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Height
                            <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                              (cm)
                            </span>
                          </FormLabel>
                          <Input
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            value={newHeight}
                            className="form-input"
                            onChange={(e) =>
                              setNewHeight(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Weight
                            <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                              (lbs)
                            </span>
                          </FormLabel>
                          <Input
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            value={newWeight}
                            className="form-input"
                            onChange={(e) =>
                              setNewWeight(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Goal Weight
                            <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                              (lbs)
                            </span>
                          </FormLabel>
                          <Input
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            value={newGoalWeight}
                            className="form-input"
                            onChange={(e) =>
                              setNewGoalWeight(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Activity Level </FormLabel>
                          <Select
                            borderWidth='1px'
                            borderColor='var(--shade5)'
                            borderRadius='10'
                            placeholder='Select Option'
                            defaultValue={activityLevel}
                            onChange={(e) => setActivityLevel(parseInt(e.target.value))}
                          >
                            <option value="1.2">Sedentary</option>
                            <option value="1.375">Moderate</option>
                            <option value="1.55">High</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </SimpleGrid>
                    <FormControl>
                      <FormHelperText mb="20px">
                        If you are working on maintenance, you can enter your
                        current weight to help us personalize your experience
                        on this app.
                      </FormHelperText>
                    </FormControl>
                    <FormControl mb="20px">
                      <SimpleGrid columns={2} spacing={5}>
                        <Box>
                          <Button
                            type="button"
                            colorScheme="facebook"
                            onClick={calculateCalories}
                            _hover={{
                              bg: "var(--shade2)",
                              color: "var(--shade6)",
                            }}
                          >
                            Calculate Your Calorie Intake
                          </Button>
                        </Box>
                        <Box className="calories">
                          {showCalories ?
                            <Input
                              disabled={true}
                              borderWidth='1px'
                              borderColor='var(--shade1)'
                              borderRadius='10'
                              color='black'
                              value={`${calories}` + ' calories/day'}
                            /> : ""}
                        </Box>
                      </SimpleGrid>
                    </FormControl>
                  </ModalBody>
                  <ModalFooter className="button" justifyContent='space-between'>
                    <Button
                      bg='var(--shade3)'
                      color='white'
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
                    {error && (
                      <div className="danger">Something went wrong..</div>
                    )}
                  </ModalFooter>
                </form>
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
  );


};

export default AddProfile;