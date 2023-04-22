// import package and local style sheet
import React, { useState } from "react";
import { Link, Form } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import AddProfile from "../components/AddProfile";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
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
  const me = data?.me || [];

  const [age, setAge] = useState(me.age);
  // const [sex, setSex] = useState(me.sex);
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
  if (data?.me) {
    return (
      <div>
        {Auth.loggedIn() ? (
          <>
            {loading ? (
              <div>Loading....</div>
            ) : (
              <Box maxW="480px">
                <Form onSubmit={handleFormSubmit}>
                  <FormControl isRequired mb="20px">
                    <FormLabel>Age</FormLabel>
                    <Input
                      value={age}
                      className="form-input"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </FormControl>
                  {/* <FormControl isRequired mb='20px'>
          <FormLabel>Birth Sex</FormLabel>
          <RadioGroup onChange={(e) => setSex(e.target.checked)}>
          <HStack spacing='24px'>
          Radio
          value={sex}>
          Male
          </Radio>
          <Radio 
          value={sex}>
          Female
          </Radio>
          <Hstack>
          </RadioGroup>
          </FormControl> */}
                  <FormControl isRequired mb="20px">
                    <FormLabel>Weight</FormLabel>
                    <Input
                      value={weight}
                      className="form-input"
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired mb="20px">
                    <FormLabel>Height</FormLabel>
                    <Input
                      value={height}
                      className="form-input"
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired mb="20px">
                    <FormLabel>Goal Weight</FormLabel>
                    <FormHelperText>
                      If you are working on maintenance, you can enter your
                      current weight here to help us personalise your experience
                      on this app.
                    </FormHelperText>
                    <Input
                      value={goalWeight}
                      className="form-input"
                      onChange={(e) => setGoalWeight(e.target.value)}
                    />
                  </FormControl>

                  <div className="button">
                    <Button type="submit">save changes</Button>
                  </div>
                  {error && (
                    <div className="danger">Something went wrong..</div>
                  )}
                </Form>
              </Box>
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
