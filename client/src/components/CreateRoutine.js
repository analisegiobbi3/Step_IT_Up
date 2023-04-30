// import package and local style sheet
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';
import { ADD_ROUTINE } from '../utils/mutations';

import {
  SimpleGrid, Stack, Box,Divider, Text, Button,
  Card, CardHeader, CardBody, CardFooter,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Input, InputGroup, InputLeftAddon,
  Radio, RadioGroup, Checkbox, Select,
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
} from '@chakra-ui/react'

import '../styles/Routine.css';

const CreateRoutine = () => {

  const { register, setValue, getValues } = useForm();
  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const [workout, setWorkout] = useState('')
  const [checkbox, setCheckbox] = useState(false);
  const [routine, setRoutine] = useState('')
  const [routineName, setRoutineName] = useState('');

  const navigate = useNavigate();
  const redirectRoutines = () => navigate('/routines');

  const outlineRoutine = () => {
    const count = getValues('count');
    const rep = getValues('rep');
    const time = getValues('time');
    const unit = getValues('unit');

    if (!checkbox) {
      if (count !== '-') {
        let workoutDetail = workout + ': ' + rep + ' rep of ' + count
        addWorkout(workoutDetail)
      } else {
        let workoutDetail = workout + ': ' + time + ' ' + unit
        addWorkout(workoutDetail)
      }
    } else {
      if (count !== '-') {
        let workoutDetail = workout + ' (L): ' + rep + ' rep of ' + count + '\n' + workout + ' (R): ' + rep + ' rep of ' + count
        addWorkout(workoutDetail)
      } else {
        let workoutDetail = workout + ' (L): ' + time + ' ' + unit + '\n' + workout + ' (R): ' + time + ' ' + unit
        addWorkout(workoutDetail)
      }
    };
    resetDetails();
  };

  const addWorkout = (workoutDetail) => {
    if (!routine) {
      setRoutine(workoutDetail);
    } else {
      setRoutine(routine + '\n' + workoutDetail)
    }
  };

  const resetDetails = () => {
    setWorkout('');
    setValue('count', '')
    setValue('rep', '')
    setValue('time', '')
    setCheckbox(false)
  };

  const [addRoutine, { error, data }] = useMutation(ADD_ROUTINE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {

      const { data } = await addRoutine({
        variables: { title: routineName, text: routine},
      });

      window.location.assign('/routines');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box className='routine-modal'>
      <Modal isOpen={isOpen} onClose={redirectRoutines} width='5000px' isCentered>
        <ModalOverlay />
        <ModalContent maxW='75vw'>
          <ModalHeader fontSize='3xl' color='var(--shade6)'>New Routine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY='auto' maxHeight='500px'>
              <Text as='b'>1. Select from a list of a popular workouts: </Text>
              <Tabs variant='enclosed-colored' mt='5'>
                <TabList>
                  <Tab>Aerobic</Tab>
                  <Tab>Strength</Tab>
                  <Tab>Stretch/Yoga</Tab>
                  <Tab>Balance</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <RadioGroup onChange={setWorkout} value={workout}>
                      <SimpleGrid columns={5} spacing={10} my='5'>
                        <Stack direction='column'>
                          <Radio value='Bicycle Crunch'>Bicycle Crunch</Radio>
                          <Radio value='Bike/Cycle'>Bike/Cycle</Radio>
                          <Radio value='Burpees'>Burpees</Radio>
                          <Radio value='Butt Kick'>Butt Kick</Radio>
                          <Radio value='Climb/Hike'>Climb/Hike</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Dance'>Dance</Radio>
                          <Radio value='Double Leg Butt Kick'>Double Leg Butt Kick</Radio>
                          <Radio value='High Knee'>High Knee</Radio>
                          <Radio value='Jog'>Jog</Radio>
                          <Radio value='Jumping Jacks'>Jumping Jacks</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Jump Lunges'>Jump Lunges</Radio>
                          <Radio value='Jump Squats'>Jump Squats</Radio>
                          <Radio value='Jump Rope'>Jump Rope</Radio>
                          <Radio value='Lateral Shuffle'>Lateral Shuffle</Radio>
                          <Radio value='March'>March</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Mountain Climber'>Mountain Climber</Radio>
                          <Radio value='Plank Jacks'>Plank Jacks</Radio>
                          <Radio value='Run'>Run</Radio>
                          <Radio value='Russian Twist'>Russian Twist</Radio>
                          <Radio value='Skaters'>Skaters</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Speed Walk'>Speed Walk</Radio>
                          <Radio value='Stair Climb'>Stair Climb</Radio>
                          <Radio value='Swim'>Swim</Radio>
                        </Stack>
                      </SimpleGrid>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup onChange={setWorkout} value={workout}>
                      <SimpleGrid columns={5} spacing={10} my='5'>
                        <Stack direction='column'>
                          <Radio value='Ab Curl Hold<'>Ab Curl Hold</Radio>
                          <Radio value='Arm Circle'>Arm Circle</Radio>
                          <Radio value='Arm up/Lateral Raise'>Arm up/Lateral Raise</Radio>
                          <Radio value='Back/Reverse Lunge6'>Back/Reverse Lunge</Radio>
                          <Radio value='Bear Crawl'>Bear Crawl</Radio>
                          <Radio value='Bicep Curl'>Bicep Curl</Radio>
                          <Radio value='Calf Raises/Tip Toe'>Calf Raises/Tip Toe</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Crunches/Sit Up'>Crunches/Sit Up</Radio>
                          <Radio value='Curl Up'>Curl Up</Radio>
                          <Radio value='Curtsy Lunge'>Curtsy Lunge</Radio>
                          <Radio value='Donkey Kick'>Donkey Kick</Radio>
                          <Radio value='Elbow to Knee'>Elbow to Knee</Radio>
                          <Radio value='Glute Bridge Hold'>Glute Bridge Hold</Radio>
                          <Radio value='Glute Bridge Walk'>Glute Bridge Walk</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Inchworm'>Inchworm</Radio>
                          <Radio value='Knee Push Up'>Knee Push Up</Radio>
                          <Radio value='Leg in/V-Sit'>Leg in/V-Sit</Radio>
                          <Radio value='Plank'>Plank</Radio>
                          <Radio value='Push Up'>Push Up</Radio>
                          <Radio value='Shoulder/Overhead Press'>Shoulder/Overhead Press</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Side/Lateral Lunge'>Side/Lateral Lunge</Radio>
                          <Radio value='Side Lying Inner Thigh'>Side Lying Inner Thigh</Radio>
                          <Radio value='Side Lying Outer Hip'>Side Lying Outer Hip</Radio>
                          <Radio value='Side Plank'>Side Plank</Radio>
                          <Radio value='Squat'>Squat</Radio>
                          <Radio value='Step Up'>Step Up</Radio>
                          <Radio value='Straight Arm Pulse'>Straight Arm Pulse</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Superman'>Superman</Radio>
                          <Radio value='Tricep Dip'>Tricep Dip</Radio>
                          <Radio value='Tricep Extension'>Tricep Extension</Radio>
                          <Radio value='Wide Leg Open-Toe Squat'>Wide Leg Open-Toe Squat</Radio>
                          <Radio value='Walking Lunge'>Walking Lunge</Radio>
                          <Radio value='Wall Sit'>Wall Sit</Radio>
                          <Radio value='Wall Push Up'>Wall Push Up</Radio>
                        </Stack>
                      </SimpleGrid>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup onChange={setWorkout} value={workout}>
                      <SimpleGrid columns={5} spacing={10} my='5'>
                        <Stack direction='column'>
                          <Radio value='Bridge'>Bridge</Radio>
                          <Radio value='Butterfly'>Butterfly</Radio>
                          <Radio value='Calf Stretch'>Calf Stretch</Radio>
                          <Radio value='Cat/Cow Stretch'>Cat/Cow Stretch</Radio>
                          <Radio value='Cobra'>Cobra</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value="Child's Pose">Child's Pose</Radio>
                          <Radio value='Downward Dog'>Downward Dog</Radio>
                          <Radio value='Forward Bend/Toe Touch'>Forward Bend/Toe Touch</Radio>
                          <Radio value='Half Forward Bend'>Half Forward Bend</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Head to Knee'>Head to Knee</Radio>
                          <Radio value='Knee to Chest'>Knee to Chest</Radio>
                          <Radio value='Low Lunge'>Low Lunge</Radio>
                          <Radio value='Pyramid'>Pyramid</Radio>
                          <Radio value='Quadriceps Stretch'>Quadriceps Stretch</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Raised Hands'>Raised Hands</Radio>
                          <Radio value='Reverse Warrior'>Reverse Warrior</Radio>
                          <Radio value='Seated Forward Bend'>Seated Forward Bend</Radio>
                          <Radio value='Shoulder Stretch'>Shoulder Stretch</Radio>
                          <Radio value='Supine Spinal Twist'>Supine Spinal Twist</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Warrior I'>Warrior I</Radio>
                          <Radio value='Warrior II'>Warrior II</Radio>
                        </Stack>
                      </SimpleGrid>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup onChange={setWorkout} value={workout}>
                      <SimpleGrid columns={5} spacing={10} my='5'>
                        <Stack direction='column'>
                          <Radio value='Bird Dog'>Bird Dog</Radio>
                          <Radio value='Heal Toe Walk'>Heal Toe Walk</Radio>
                          <Radio value='Heel Lift'>Heel Lift</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Mountain Pose'>Mountain Pose</Radio>
                          <Radio value='Side Arm/Leg Reach'>Side Arm/Leg Reach</Radio>
                          <Radio value='Single Leg Squat'>Single Leg Squat</Radio>
                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Single Knee Lift'>Single Knee Lift</Radio>
                          <Radio value='Single Knee Lift with Rotation'>Single Knee Lift with Rotation</Radio>

                        </Stack>
                        <Stack direction='column'>
                          <Radio value='Standing Bird Dog<'>Standing Bird Dog</Radio>
                          <Radio value='Tree Pose'>Tree Pose</Radio>
                          <Radio value='Tight Rope Walk'>Tight Rope Walk</Radio>
                        </Stack>
                      </SimpleGrid>
                    </RadioGroup>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Text mb='5'>OR </Text>
              <Text as='b'>Create your own: </Text>
              <InputGroup my='3'>
                <InputLeftAddon as='b' bg='var(--shade4)' color='white'>Workout</InputLeftAddon>
                <Input width='50%' placeholder='i.e. Breathe'
                  value={workout}
                  onChange={(e) => { setWorkout(e.target.value) }}
                />
                <Checkbox ml='5' isChecked={checkbox} onChange={(e) => setCheckbox(e.target.checked)}>Repeat for Left and Right</Checkbox>
              </InputGroup>

              <Divider borderWidth='3px' borderColor='black' my='5' />

              <Text as='b'>2. Enter the workout details: </Text>
              <InputGroup mt='3' onSubmit={() => { setValue('count', ''); setValue('rep', ''); setValue('time', '') }}>
                <InputLeftAddon as='b' bg='var(--shade4)' color='white'>Count</InputLeftAddon>
                <Input min={1} mr='3' width='30vw' onClick={() => { setValue('time', '-') }}
                  {...register('count', { required: false })} />
                <InputLeftAddon as='b' bg='var(--shade4)' color='white'>Rep</InputLeftAddon>
                <Input min={1} width='30vw' onClick={() => { setValue('time', '-') }}
                  {...register('rep', { required: false })} />
                <Text mx='5' my='auto'>OR</Text>
                <InputLeftAddon as='b' bg='var(--shade4)' color='white'>Time</InputLeftAddon>
                <Input min={1} width='30vw' onClick={() => { setValue('count', '-'); setValue('rep', '-'); }}
                  {...register('time', { required: false })} />
                <Select mr='5' width='60vw'
                  {...register('unit', { required: false })}>
                  <option value='second(s)'>second(s)</option>
                  <option value='minute(s)'>minute(s)</option>
                  <option value='hour(s)'>hour(s)</option>
                </Select>
                <Button width='30vw'
                  bg='var(--shade1)' color='white'
                  _hover={{ bg: 'var(--shade6)' }}
                  onClick={() => { outlineRoutine() }}>Add Workout</Button>
              </InputGroup>

              <Divider borderWidth='3px' borderColor='black' my='5' />

              <Text as='b'>3. Preview Routine: </Text>
              <Card borderWidth='1px' width='fit-content' m='5'>
                <CardHeader pb='0'>
                  <input
                  type='text'
                  name='routineName'
                  value={routineName}
                  placeholder='Click to name the routine'
                  onChange={(e)=> {setRoutineName(e.target.value)}}
                  />
                </CardHeader>
                <CardBody>
                  <Text>{routine}</Text>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => { setRoutine(''); setRoutineName(''); resetDetails() }} bg='var(--shade3)' color='white'>Reset</Button>
                </CardFooter>
              </Card>

            </Box>
          </ModalBody>

          <ModalFooter justifyContent='space-between'>
            <Button colorScheme='gray' mr={3} onClick={redirectRoutines}>Close</Button>
            <Button onClick={handleFormSubmit} bg='var(--shade1)' color='white' _hover={{ bg: 'var(--shade6)' }}>Add Routine</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateRoutine;