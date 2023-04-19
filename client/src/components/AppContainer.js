// import package and local components
import React, { useState } from 'react';
import NavTabs from './NavTabs';
// import Footer from './Footer';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';

// import general styling for all pages
import '../styles/Global.css';

export default function AppContainer() {
  // set the default page on site launch
  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Calendar') {
      return <Calendar />;
    }
    if (currentPage === 'Profile') {
      return <Profile />;
    }
    // if (currentPage === 'Tracker') {
    //   return <Tracker />;
    // }
    // if (currentPage === 'Routines') {
    //   return <Routines />;
    // }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="global">
      {/* pass the currentPage from state and the function to update it */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* call the renderPage method which will return a component  */}
      {renderPage()}
      {/* add the footer to the page */}
      {/* <Footer /> */}
    </div>
  );
}
