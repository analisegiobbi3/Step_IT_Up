// import package and local style sheet
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import AddProfile from "../components/AddProfile";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  RadioGroup,
  Radio,
  HStack
} from "@chakra-ui/react";

import { QUERY_ME } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";

import Auth from "../utils/auth";

const HandleNewData = () => {
  const [showAddProfile, setShowAddProfile] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();

    setShowAddProfile(true);
  };
  return (
    <div>
      {showAddProfile ? (
        <AddProfile />
      ) : (
        <Button onClick={handleClick}>
          Start by adding your information!
        </Button>
      )}
    </div>
  );
};

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me.profile || [];

  const [age, setAge] = useState(me.age);
  const [sex, setSex] = useState(me.sex);
  const [weight, setWeight] = useState(me.weight);
  const [height, setHeight] = useState(me.height);
  const [goalWeight, setGoalWeight] = useState(me.goalWeight);

  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProfile({
        variables: { age, weight, height, goalWeight },
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  if (data?.me.profile) {
    return (
      <div>
        {Auth.loggedIn() ? (
          <>
            {loading ? (
              <div>Loading....</div>
            ) : (
              // <Box maxW="480px">
              <form onSubmit={handleFormSubmit}>
                <label>Age</label>
                <input
                  type="number"
                  defaultValue={age}
                  value={age}
                  className="form-input"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label>Birth Sex</label>
                {/* <RadioGroup onChange={(e) => setSex(e.target.value)}>
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
                <label>Weight</label>
                <input
                  defaultValue={weight}
                  value={weight}
                  className="form-input"
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
                <label>Height</label>
                <input
                  defaultValue={height}
                  value={height}
                  className="form-input"
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
                <label>Goal Weight</label>
                {/* <FormHelperText>
                      If you are working on maintenance, you can enter your
                      current weight here to help us personalise your experience
                      on this app.
                    </FormHelperText> */}
                <input
                  defaultValue={goalWeight}
                  value={goalWeight}
                  className="form-input"
                  onChange={(e) => setGoalWeight(parseInt(e.target.value))}
                />

                <div className="button">
                  <button type="submit">save changes</button>
                </div>
                {error && <div className="danger">Something went wrong..</div>}
              </form>
              // </Box>
            )}
          </>
        ) : (
          <p>
            You need to be logged in to view your profile. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  } else {
    return <HandleNewData />;
  }
};

export default Profile;
