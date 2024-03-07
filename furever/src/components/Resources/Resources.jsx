import React, { useState } from 'react';
import './Resources.css';
const Resources = () => {
  const [location, setLocation] = useState('');
  const [animalType, setAnimalType] = useState('');


  const dummyResources = [
    { id: 1, name: 'Rescue Organization 1', location: 'Wyoming', type: 'Dog' },
    { id: 2, name: 'Rescue Organization 2', location: 'City B', type: 'Cat' },

  ];


  const filterResources = () => {

    return dummyResources.filter(
      (resource) =>
        resource.location.toLowerCase().includes(location.toLowerCase()) &&
        resource.type.toLowerCase().includes(animalType.toLowerCase())
    );
  };

  
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };


  return (
    <div className='parent-container'>
      <h2>Find Resources</h2>
      <div className='resources'>
        <label>
          Location:
          <input type="text" value={location} onChange={handleLocationChange}
          placeholder= 'postal zip code required'
           />
        </label>
      </div>
    </div>
  );
};

export default Resources;