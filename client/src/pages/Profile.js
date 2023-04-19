// import package and local style sheet
import React from 'react';

import { 
  Grid, GridItem, Image, Button, IconButton,
  FormControl, FormLabel, Switch,
  Input, InputGroup, InputRightAddon,
  Radio, RadioGroup, Stack, Select,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
} from '@chakra-ui/react'

import { FiEdit } from "react-icons/fi";
import { IoIosInformationCircleOutline, IoIosCalculator } from "react-icons/io";

import '../styles/Profile.css';

export default function Profile() {
  const [value, setValue] = React.useState('')

  return (
    <Grid className= 'profile-page' templateColumns='repeat(10, 1fr)' gap={3}>
      <GridItem colSpan={3}>
      <Image boxSize='350px' objectFit='cover' src='https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/exercise-circle-blue-512.png' alt='Dan Abramov'/>
      <Button colorScheme='facebook' size='lg' width='100%' my='10'>
        Upload Image
      </Button>
      <FormControl display='flex' alignItems='center' my='3'>
        <FormLabel htmlFor='calorie-tracker' mb='0'>
          Calorie Tracker
        </FormLabel>
        <Switch id='calorie-tracker' size='lg' />
      </FormControl>
      <FormControl display='flex' alignItems='center' my='3'>
        <FormLabel htmlFor='weight-tracker' mb='0'>
          Weight Tracker
        </FormLabel>
        <Switch id='weight-tracker' size='lg' />
      </FormControl>
      </GridItem>
      <GridItem colSpan={4}>
        <FormControl>
          <InputGroup size='md' my='4'>
            <FormLabel>Username</FormLabel>
            <Input type='username' variant='filled' width='auto' />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Email address</FormLabel>
            <Input type='email' variant='filled' width='auto' />
            <InputRightAddon children='.com' />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Password</FormLabel>
            <Input type='password' variant='filled' width='auto' />
            <IconButton colorScheme='facebook' aria-label='Call Segun' size='md' icon={<FiEdit />} />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Birthdate</FormLabel>
            <Input type='date' variant='filled' width='auto' />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Birth Sex</FormLabel>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction='row'  mt='3'>
                <Radio value='1' size='lg' mx='5'>Male</Radio>
                <Radio value='2' size='lg'>Female</Radio>
              </Stack>
            </RadioGroup>
          </InputGroup>
        </FormControl>
      </GridItem>
      <GridItem colSpan={3}>
        <FormControl>
          <InputGroup size='md' my='4'>
            <FormLabel>Weight (lbs)</FormLabel>
            <NumberInput variant='filled' height='50%' >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Height (cm)</FormLabel>
            <NumberInput variant='filled' height='50%' >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Activity Level</FormLabel>
            <Select variant='filled' width='auto'>
              <option value='option1'>Inactive</option>
              <option value='option2'>Somewhat Active</option>
              <option value='option3'>Active</option>
              <option value='option4'>Very Active</option>
            </Select>
            <IconButton colorScheme='facebook' aria-label='Call Segun' size='md' icon={<IoIosInformationCircleOutline />} />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Maintenance Calories</FormLabel>
            <IconButton colorScheme='facebook' aria-label='Call Segun' size='md' icon={<IoIosCalculator />} />
          </InputGroup>
          <InputGroup size='md' my='4'>
            <FormLabel>Daily</FormLabel>
            <Input type='int' variant='filled' width='auto' mr='3' />
            <FormLabel>Monthly</FormLabel>
            <Input type='int' variant='filled' width='auto' />
          </InputGroup>
          <Button colorScheme='facebook' size='lg' width='100%' type='submit' my='10'>
            Save
          </Button>
        </FormControl>
      </GridItem>
    </Grid>
  );
}

