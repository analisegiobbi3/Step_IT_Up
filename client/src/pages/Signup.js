import React, { useState } from 'react';
import { Input } from '@chakra-ui/react'
import AuthService from '../utils/auth.js'

const Signup = () => {
    const [ userSignupData, setUserSignupData ] = useState({ username: '', email: '', password: '' });

    const [ validated ] = useState(false);

    const [ showAlert, setShowAlert ] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUserSignupData({ ...userFormData, [name]: value });
    }

   return (
    <>
        {/* Add functionality for validtaing response for sign up if good or badd */}
        

    </>
   )
}

export default Signup;

