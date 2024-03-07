import React, { useState } from 'react';
import SlideControl from '../SlideControl/SlideControl';
import './Dashboard.css';

const Dashboard = ({ onUpdatePreferences }) => {
  const [location, setLocation] = useState('');
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAnimalTypeChange = (type) => {
    setSelectedAnimalType(type);
  };

  const handleUpdatePreferences = async () => {
    if (typeof onUpdatePreferences === 'function') {
      await onUpdatePreferences({
        location,
        animalType: selectedAnimalType,
      });
    }
  };

  return (
    <div className="dashboard-container">
      <div>
        <label>
          Location:
          <input
            type="text"
            className="location-input"
            value={location}
            onChange={handleLocationChange}
            required
            placeholder="postal zip code required"
          />
        </label>
      </div>
      <div className="radio-container">
        <p>Select Animal Type:</p>
        <label>
          Cat
          <input
            type="radio"
            name="animalType"
            value="cat"
            checked={selectedAnimalType === 'cat'}
            onChange={() => handleAnimalTypeChange('cat')}
          />
        </label>
        <label>
          Dog
          <input
            type="radio"
            name="animalType"
            value="dog"
            checked={!selectedAnimalType || selectedAnimalType === 'dog'}
            onChange={() => handleAnimalTypeChange('dog')}
          />
        </label>
        <label>
          Other
          <input
            type="radio"
            name="animalType"
            value="other"
            checked={selectedAnimalType === 'rabbit'}
            onChange={() => handleAnimalTypeChange('rabbit')}
          />
        </label>
      </div>
      <div>
        <button onClick={handleUpdatePreferences}>Update Preferences </button>
      </div>
      <SlideControl animalType={selectedAnimalType} location={location} />
    </div>
  );
};

export default Dashboard;