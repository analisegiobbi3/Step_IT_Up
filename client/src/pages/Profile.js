// import package and local style sheet
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation} from '@apollo/client';
import AddProfile from '../components/AddProfile';

import { QUERY_ME } from '../utils/queries';
import { UPDATE_PROFILE } from '../utils/mutations';

import Auth from '../../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  const [age, setAge] = useState(me.age);
  const [weight, setWeight] = useState(me.weight);
  const [height, setHeight] = useState(me.height);
  const [goalWeight, setGoalWeight] = useState(me.goalWeight);

  const [updateProfile, { error }] = useMutation(UPDATE_PROFILE);

    const HandleNewData = () => {
    const [showAddProfile, setShowAddProfile] = useState(false);

    const handleClick = (event) => {
    event.preventDefault() ;

    setShowAddProfile(true);
    return (
      <div>
      {showAddProfile ? (
        <AddProfile />
      ) : (
        <button onClick={handleClick}>Start by adding your information!</button>
      )}

      </div>
    )
  }
}

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try{
      const { data } = await updateProfile({
        variables: { age, weight, height, goalWeight},
      });

      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  const DisplayAndEdit = () => {
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
          value={age}
          className = 'form-input'
          onChange={(e) => setAge(e.target.value)}
          />
          <label>Weight</label>
          <input 
          value={weight}
          className='form-input'
          onChange={(e) => setWeight(e.target.value)}
          />
          <label>Height</label>
          <input 
          value={height}
          className='form-input'
          onChange={(e) => setHeight(e.target.value)}
          />
          <label>Goal Weight</label>
          <input
          value={goalWeight}
          className='form-input'
          onChange={(e) => setGoalWeight(e.target.value)}
          />
        </div>

        <div className='button'>
          <button>save changes</button>
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
  }
  
  if(data?.me) {
    return DisplayAndEdit
  } else {
    return HandleNewData
  }

}

export default Profile;