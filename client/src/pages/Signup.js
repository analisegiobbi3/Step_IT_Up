// import React, { useState } from 'react';
// import { Link, Form } from 'react-router-dom';

// import { useMutation  } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// import Auth from '../utils/auth';

// import '../styles/Signup.css';

// import {
//     FormControl,
//     Input,
//     Button,
//     Text,
//     FormLabel
//   } from '@chakra-ui/react';

// const Signup = () =>  {

//     const [formState, setFormState] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });

//     const [addUser, { data }] = useMutation(ADD_USER);

//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormState({
//             ...formState,
//             [name]: value,
//         })
//     };

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();
//         console.log(formState);
    
//         try { 
//             const { data } = await addUser({
//                 variables: { ...formState},
//             });

//             Auth.login(data.addUser.token);
//         } catch (e) {
//             console.error(e);
//         }
//     };
//   return (
//     <>
//       <div className="signup">
//         {data ? (
//           <p>
//             Success! You may now head <Link to="/">back to homepage</Link>
//           </p>
//         ) : (
//           <div className="signup-form">
//             <div>
//               <Form onSubmit={handleFormSubmit}>
//                 <FormControl isRequired>
//                   <Text fontSize="2xl" m={5}>
//                     Create your Account
//                   </Text>
//                   <div className="username-input flex">
//                     <FormLabel>Username</FormLabel>
//                     <Input
//                       type="username"
//                       placeholder="Username"
//                       size="md"
//                       htmlSize={20}
//                       width="auto"
//                       value={formState.name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className="email-input">
//                     <FormLabel>Email</FormLabel>
//                     <Input
//                       type="email"
//                       placeholder="Email"
//                       size="md"
//                       htmlSize={55}
//                       width="auto"
//                       value={formState.email}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="password-input">
//                     <FormLabel>Password</FormLabel>
//                     <Input
//                       pr="4rem"
//                       type="password"
//                       placeholder="Password"
//                       htmlSize={35}
//                       width="auto"
//                       value={formState.password}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <Button type="submit">Sign up</Button>
//                 </FormControl>
//               </Form>
//             </div>
//             <div className="login flex">
//               <Link to="/Login">Would you like to Log In instead?</Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Signup;