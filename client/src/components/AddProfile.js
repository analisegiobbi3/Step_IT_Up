import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation} from '@apollo/client';

import { ADD_PROFILE } from "../utils/mutations";

import Auth from '../../utils/auth';

const AddProfile = () => {
  const [newAge, setNewAge] = useState(' ');
  const [newWeight, setNewWeight] = useState(' ');
  const [newHeight, setNewHeight] = useState(' ');
  const [newGoalWeight, setNewGoalWeight] = useState(' ');

    const [addProfile, { error }] = useMutation(ADD_PROFILE);

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await addProfile({
        variables: { newAge, newWeight, newHeight, newGoalWeight},
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

    return (
      <div>
        {Auth.loggedIn() ? (
          <>
            <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className='col-12'>
          <label>Age</label>
          <input 
          value={newAge}
          className = 'form-input'
          onChange={(e) => setNewAge(e.target.value)}
          />
          <label>Weight</label>
          <input 
          value={newWeight}
          className='form-input'
          onChange={(e) => setNewWeight(e.target.value)}
          />
          <label>Height</label>
          <input 
          value={newHeight}
          className='form-input'
          onChange={(e) => setNewHeight(e.target.value)}
          />
          <label>Goal Weight</label>
          <input
          value={newGoalWeight}
          className='form-input'
          onChange={(e) => setNewGoalWeight(e.target.value)}
          />
        </div>

        <div className='button'>
          <button>Add Profile</button>
        </div>
        {error && (
          <div className='danger'>
            Something went wrong..
          </div>
        )}
      </form>
          </>) : (
          <p>
            You need to be logged in to view your profile. Please {' '}
            <Link to='/login'>login</Link> or <Link to="/signup">signup.</Link>
            </p>
        )}
      </div>
    )
  };

  export default AddProfile;