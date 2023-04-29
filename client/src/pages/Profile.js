// import package and local style sheet
import React, { useEffect, useState } from "react";
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
  const me = data?.me.profile;

  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState('');
  const [showCalories, setShowCalories] = useState(false);

useEffect(() => {
  if(!me) return
  setAge(me.age);
  setSex(me.sex);
  setHeight(me.height);
  setWeight(me.weight);
  setGoalWeight(me.goalWeight);
  setActivityLevel(me.activityLevel);
  setCalories(me.calories);
}, [me])
  
  const { profileId } = useParams();
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: { profileId: me?._id }
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
    if(sex === 'Male') {
      const bmr = 88.362 + (13.397 * (goalWeight * 2.2) + (4.799 * height) - (5.677 * age))
      setCalories(Math.round(bmr * activityLevel))

    } else {
      const bmr =
        447.593 + (9.247 * (goalWeight * 2.2) + 3.098 * height - 4.330 * age)
        setCalories(Math.round(bmr * activityLevel))
    }
  }
  if (me) {
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
                  value={age}
                  // value={me.age}
                  className="form-input"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
                <label>Birth Sex</label>
                <select value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label>Height</label>
                <input
                  value={height}
                  // value={me.height}
                  className="form-input"
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                />
                <label>Weight</label>
                <input
                  value={weight}
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
                  value={goalWeight}
                  // value={me.goalWeight}
                  className="form-input"
                  onChange={(e) => setGoalWeight(parseInt(e.target.value))}
                />
                <label>Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="1.375">Sedentary</option>
                  <option value="1.55">Moderate</option>
                  <option value="1.9">High</option>
                </select>
                <button type="button" onClick={calculateCalories}>
                  Calculate your calorie intake according to your goal weight
                </button>
                <div>{calories ? <p>{calories}</p> : ""}</div>
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
