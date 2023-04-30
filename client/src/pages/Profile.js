// import package and local style sheet
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import AddProfile from "../components/AddProfile";
import '../styles/Profile.css';
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

import { QUERY_ME } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";

import Auth from "../utils/auth";

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me.profile;

  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [calories, setCalories] = useState("");
  const [showCalories, setShowCalories] = useState(false);

  useEffect(() => {
    if (!me) return;
    setAge(me.age);
    setSex(me.sex);
    setHeight(me.height);
    setWeight(me.weight);
    setGoalWeight(me.goalWeight);
    setActivityLevel(me.activityLevel);
    setCalories(me.calories);
  }, [me]);

  const { profileId } = useParams();
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: { profileId: me?._id },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProfile({
        variables: { age, weight, height, goalWeight, calories, activityLevel },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateCalories = (e) => {
    setShowCalories(true);
    if (sex === "Male") {
      const bmr =
        88.362 + (13.397 * (goalWeight/ 2.2) + (4.799 * height) - (5.677 * age));
      setCalories(Math.round(bmr * activityLevel));
    } else {
      const bmr =
        447.593 + (9.247 * (goalWeight/ 2.2) + (3.098 * height) - (4.33 * age));
      setCalories(Math.round(bmr * activityLevel));
    }
  };

  const { isOpen } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();
  const returnToHome = () => navigate("/");

  if (me) {
    return (
      <div className="profile">
        <Box className="profile-modal">
          <Modal isOpen={isOpen} onClose={returnToHome}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Are you ready to step it up?</ModalHeader>
              <ModalCloseButton />
              {Auth.loggedIn() ? (
                <>
                  {loading ? (
                    <div>Loading....</div>
                  ) : (
                    <form onSubmit={handleFormSubmit}>
                      <ModalBody>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Age</FormLabel>
                          <Input
                            type="number"
                            value={age}
                            // value={me.age}
                            className="form-input"
                            onChange={(e) => setAge(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Birth Sex</FormLabel>
                          <Select
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                          >
                            <option value="">Please select an option</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Select>
                        </FormControl>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Height</FormLabel>
                          <FormHelperText mb="20px">(cm)</FormHelperText>
                          <Input
                            defaultValue={height}
                            // value={me.height}
                            className="form-input"
                            onChange={(e) =>
                              setHeight(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Weight</FormLabel>
                          <FormHelperText mb="20px">(lbs)</FormHelperText>
                          <Input
                            value={weight}
                            // value={me.goalWeight}
                            className="form-input"
                            onChange={(e) =>
                              setWeight(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Goal Weight</FormLabel>
                          <FormHelperText mb="20px">(lbs)</FormHelperText>
                          <FormHelperText mb="20px">
                            If you are working on maintenance, you can enter
                            your current weight to help us personalise your
                            experience on this app.
                          </FormHelperText>

                          <Input
                            value={goalWeight}
                            // value={me.goalWeight}
                            className="form-input"
                            onChange={(e) =>
                              setGoalWeight(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormControl isRequired mb="20px">
                          <FormLabel>Activity Level</FormLabel>
                          <Select
                            defaultValue={activityLevel}
                            onChange={(e) =>
                              setActivityLevel(parseInt(e.target.value))
                            }
                          >
                            <option value="">Please select an option</option>
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
                            mb="20px"
                            _hover={{
                              bg: "var(--shade2)",
                              color: "var(--shade6)",
                            }}
                          >
                            calculate your calorie intake
                          </Button>
                          <div className="calories">
                            {calories ? <p>{calories} calories/day</p> : ""}
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
                            save changes
                          </Button>
                        </div>
                        {error && (
                          <div className="danger">Something went wrong..</div>
                        )}
                      </ModalFooter>
                    </form>
                  )}
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
  } else {
    return <AddProfile />;
  }
};

export default Profile;
