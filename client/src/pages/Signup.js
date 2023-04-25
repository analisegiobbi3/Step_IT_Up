import React, { useState } from 'react';
import '../styles/Signup.css';

import {
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Text,
    FormHelperText,
    Link,
  } from '@chakra-ui/react'

export default function Signup() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

  return (
    <>
        <div className='signup'>
            <div className='signup-form'>
                <div>
                    <FormControl isRequired>
                        <Text fontSize="2xl" m={5}>Create your Account</Text>
                        <div className='names-input flex'>
                            <Input 
                            type='First name' 
                            placeholder='First name' 
                            size='md' 
                            htmlSize={20} 
                            width='auto'
                            />
                        
                            <Input 
                            type='Last name' 
                            placeholder='Last name' 
                            size='md' htmlSize={15} 
                            width='auto'/>
                        </div>
                        <div className='email-input'>
                            <Input 
                            type='email' 
                            placeholder='Email' 
                            size='md' 
                            htmlSize={55} 
                            width='auto'/>
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </div>
                        
                        <div className='password-input'>
                            <InputGroup size='md'>
                                <Input
                                    pr='4rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    htmlSize={35} 
                                    width='auto'
                                />
                                <InputRightElement width='30rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText>We'll never share your email.</FormHelperText>
                        </div>    
                    </FormControl>
                </div>
                <div className='login flex'>
                    <Link to='/Login'>
                        You can login instead
                    </Link>
                    <Button>
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    </>
  )
}
