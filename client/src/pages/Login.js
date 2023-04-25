import React, { useState } from "react";
import { Link, Form } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from '../utils/auth';

import { FormControl, Input, Button, Text, FormLabel } from "@chakra-ui/react";

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { data }] = useMutation(LOGIN_USER);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
      <>
        <div className="login">
          {data ? (
            <p>
              Success! You may now head <Link to="/">back to homepage</Link>
            </p>
          ) : (
            <div className="login-form">
              <div>
                <Form onSubmit={handleFormSubmit}>
                  <FormControl isRequired>
                    <Text fontSize="2xl" m={5}>
                      Log In
                    </Text>
                    <div className="email-input">
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email"
                        size="md"
                        htmlSize={55}
                        width="auto"
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="password-input">
                      <FormLabel>Password</FormLabel>
                      <Input
                        pr="4rem"
                        type="password"
                        placeholder="Password"
                        htmlSize={35}
                        width="auto"
                        value={formState.password}
                        onChange={handleChange}
                      />
                    </div>
                    <Button type="submit">Log In</Button>
                  </FormControl>
                </Form>
              </div>
              <div className="signup flex">
                <Link to="/Signup">Would you like to Sign Up instead?</Link>
              </div>
            </div>
          )}
        </div>
      </>
    );
};

export default Login;