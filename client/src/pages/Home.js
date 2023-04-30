// import package and local style sheet
import React from 'react';

import {
  Box, Image
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Box height='fit-content'>
      {/* homepage with name display */}
      <Image boxSize='100vh' src='./animatedLogo.gif' alt='Step It Up' m='auto' pb='5vh'/>
    </Box>
  );
}
