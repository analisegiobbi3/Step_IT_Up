// import packages and local auth
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

// import queries and mutations
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { UPDATE_PROFILE } from '../utils/mutations';

// import local components
import AddProfile from '../components/AddProfile';

// import package components
import {
  Box, Input, Button, Select, SimpleGrid,
  FormControl, FormLabel, FormHelperText,
} from '@chakra-ui/react';

// import local style sheet
import '../styles/Profile.css';

// component to view or create profile
const Profile = () => {

  // query all data associated with the signed in user
  const { loading, data } = useQuery(QUERY_ME);
  // extract the profile data 
  const me = data?.me.profile;

  // set state of profile fields, default blank
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState('');
  // set state of calorie intake display, default to false
  const [showCalories, setShowCalories] = useState(false);

  // if user already has a profile, set the states of the field to existing data
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

  // 
  const { profileId } = useParams();
  // mutation to update profile, pass in the id of the current user
  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE, {
    variables: { profileId: me?._id },
  });

  // update profile on submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateProfile({
        // pass in set fields
        variables: { age, weight, height, goalWeight, calories, activityLevel },
      });

      // reload page on success
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // 
  const calculateCalories = (e) => {
    setShowCalories(true);
    if (sex === 'Male') {
      const bmr =
        88.362 + (13.397 * (goalWeight / 2.2) + (4.799 * height) - (5.677 * age));
      setCalories(Math.round(bmr * activityLevel));
    } else {
      const bmr =
        447.593 + (9.247 * (goalWeight / 2.2) + (3.098 * height) - (4.33 * age));
      setCalories(Math.round(bmr * activityLevel));
    }
  };

  // if profile exist for current user
  if (me) {
    // display the profile page
    return (
      <Box className='profile'>
        {/* check that the user is logged in */}
        {Auth.loggedIn() ? (
          <>
          {/* chcked if query is complete */}
            {loading ? (
              <div>Loading....</div>
            ) : (
              // profile form, to be populated with query information
              <form onSubmit={handleFormSubmit}>
                <SimpleGrid columns={2} spacing={5} className='profile-page'>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Age </FormLabel>
                      <Input
                        type='number'
                        value={age}
                        className='form-input'
                        onChange={(e) => setAge(parseInt(e.target.value))}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Birth Sex </FormLabel>
                      <Select
                        placeholder='Select Option'
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                      >
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Height
                        <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                          (cm)
                        </span>
                      </FormLabel>
                      <Input
                        defaultValue={height}
                        className='form-input'
                        onChange={(e) =>
                          setHeight(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Weight
                        <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                          (lbs)
                        </span>
                      </FormLabel>
                      <Input
                        value={weight}
                        className='form-input'
                        onChange={(e) =>
                          setWeight(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Goal Weight
                        <span style={{ color: 'var(--shade3)', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
                          (lbs)
                        </span>
                      </FormLabel>
                      <Input
                        value={goalWeight}
                        className='form-input'
                        onChange={(e) =>
                          setGoalWeight(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isRequired mb='20px'>
                      <FormLabel>Activity Level</FormLabel>
                      <Select
                        placeholder='Select Option'
                        value={String(activityLevel)}
                        onChange={(e) =>
                          setActivityLevel(parseFloat(e.target.value))
                        }
                      >
                        <option value='1.2'>Sedentary</option>
                        <option value='1.375'>Moderate</option>
                        <option value='1.55'>High</option>
                      </Select>
                    </FormControl>
                  </Box>
                </SimpleGrid>
                <FormControl>
                  <FormHelperText mb='20px' fontSize='2vw' color='var(--shade6)'>
                    If you are working on maintenance, you can enter your
                    current weight to help us personalize your experience
                    on this app.
                  </FormHelperText>
                </FormControl>
                <SimpleGrid columns={4} spacing={5}>
                  <Box>
                    <FormControl mb='20px'>
                      <Button
                        type='button'
                        colorScheme='facebook'
                        onClick={calculateCalories}
                        mb='20px'
                        width='100%'
                        fontSize='2vw'
                        height='5vw'
                        _hover={{
                          bg: 'var(--shade2)',
                          color: 'var(--shade6)',
                        }}
                      >
                        Calculate Your Calorie Intake
                      </Button>
                    </FormControl>
                  </Box>
                  <Box className='calories'>
                    {calories ?
                      <Input
                        disabled={true}
                        borderWidth='1px'
                        borderColor='var(--shade1)'
                        borderRadius='10'
                        color='black'
                        textAlign='center'
                        fontSize='2vw'
                        height='5vw'
                        bg='rgba(255, 255, 255, 0.75)'
                        value={`${calories}` + ' calories/day'}
                      /> : ''}
                  </Box>
                  <Box></Box>
                  <Box textAlign='end'>
                    <Button
                      bg='var(--shade1)'
                      color='white'
                      width='100%'
                      fontSize='2vw'
                      height='5vw'
                      _hover={{
                        bg: 'var(--shade2)',
                        color: 'var(--shade6)',
                      }}
                      type='submit'
                    >
                      Update Profile
                    </Button>
                  </Box>
                </SimpleGrid>
                {error && (
                  <div className='danger'>Something went wrong..</div>
                )}

              </form>
            )}
          </>
        ) : (
          // message if user is not logged in
          <p>
            You need to be logged in to view your profile. Please{' '}
            <Link to='/loginSignup'>Login/Signup</Link>
          </p>
        )}
      </Box>
    );
  } else {
    // if profile does not exist for user, render profile modal component
    return <AddProfile />;
  }
};

export default Profile;
