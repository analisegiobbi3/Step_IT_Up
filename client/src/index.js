// import packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import react css styling package
import { ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';

// define the location to render the page/content in the public index.html file
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();