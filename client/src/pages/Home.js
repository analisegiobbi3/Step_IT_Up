// import package
import React from 'react';

// import package components
import {
  Box, Image
} from '@chakra-ui/react';


// component for the home page
export default function Home() {
  return (
    <Box height='fit-content'>
      {/* display gif on the homepage, fit gif to viewport height (100vh) */}
      <Image boxSize='100vh' src='./animatedLogo.gif' alt='Step It Up' m='auto' pb='5vh'/>
    </Box>
  );
}
