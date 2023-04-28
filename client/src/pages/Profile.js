// import package and local style sheet
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  HStack,
  Modal,
  ModalContent,
  ModalHeader
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
  const [activityLevel, setActivityLevel] = useState(me.activityLevel);
  const [calories, setCalories] = useState(me.calories);
  const [showCalories, setShowCalories] = useState(false);


  
  const { profileId } = useParams();
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: { profileId: profileId }
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

  const calculateCalories = () => {
    setShowCalories(true);
    if(me.sex === 'Male') {
      const bmr = 88.362 + (13.397 * (me.goalWeight * 2.2) + (4.799 * me.height) - (5.677 * me.age))
      setCalories(bmr * activityLevel)

    } else {
      const bmr =
        447.593 + (9.247 * (me.goalWeight * 2.2) + 3.098 * me.height - 4.330 * me.age)
        setCalories(bmr * activityLevel)
    }
  }
  if (data?.me.profile) {
    return (
      <div>
        {Auth.loggedIn() ? (
          <>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label>Age</label>
                <input
                  type="number"
                  defaultValue={me.age}
                  // value={me.age}
                  className="form-input"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label>Birth Sex</label>
                <select value={me.sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label>Height</label>
                <input
                  defaultValue={me.height}
                  // value={me.height}
                  className="form-input"
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
                <label>Weight</label>
                <input
                  defaultValue={me.weight}
                  // value={me.goalWeight}
                  className="form-input"
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                />
                <label>Goal Weight</label>
                {/* <FormHelperText>
                      If you are working on maintenance, you can enter your
                      current weight here to help us personalise your experience
                      on this app.
                    </FormHelperText> */}
                <input
                  defaultValue={me.goalWeight}
                  // value={me.goalWeight}
                  className="form-input"
                  onChange={(e) => setGoalWeight(parseInt(e.target.value))}
                />
                <label>Activity Level</label>
                <select
                  defaultValue={me.activityLevel}
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
