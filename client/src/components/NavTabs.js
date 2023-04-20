// import package and local style sheet
import React from 'react';
import '../styles/NavBar.css';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';

// page navigation bar
function NavTabs({ currentPage, handlePageChange }) {
  return (
    <Breadcrumb className='navBar' separator='   '>
      <BreadcrumbItem>
        <a
          href="#home"
          onClick={() => handlePageChange('Home')}
          // check to see if the current page is "Home", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a
          href="#blog"
          onClick={() => handlePageChange('Blog')}
          // check to see if the current page is "Blog", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Blog' ? 'nav-link active' : 'nav-link'}
        >
          Blog
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a
          href="#calendar"
          onClick={() => handlePageChange('Calendar')}
          // check to see if the current page is "Calendar", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Calendar' ? 'nav-link active' : 'nav-link'}
        >
          Calendar
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a
          href="#tracker"
          onClick={() => handlePageChange('Tracker')}
          // check to see if the current page is "Tracker", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Tracker' ? 'nav-link active' : 'nav-link'}
        >
          Tracker
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a
          href="#routines"
          onClick={() => handlePageChange('Routines')}
          // check to see if the current page is "Profile", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Routines' ? 'nav-link active' : 'nav-link'}
        >
          Routines
        </a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <a
          href="#profile"
          onClick={() => handlePageChange('Profile')}
          // check to see if the current page is "Profile", if it is, set the current page to 'nav-link-active', otherwise set it to 'nav-link'
          className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
        >
          Profile
        </a>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default NavTabs;
