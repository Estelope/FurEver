import React, { useState } from 'react';
import './Resources.css';

const Resources = () => {
  const [location, setLocation] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [error, setError] = useState(null);


  const fetchOrganizations = async () => {

    try {

      const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
      const client_id = process.env.REACT_APP_API_KEY;
      const client_secret = process.env.REACT_APP_API_SECRET;

      const tokenResponse = await fetch(tokenUrl, {

        method: 'POST',

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,

      });



      const tokenData = await tokenResponse.json();

      if (tokenData.error) {

        setError(`Error getting access token: ${tokenData.error.message}`);

        return;

      }



      const apiUrl = `https://api.petfinder.com/v2/organizations?location=${location}`;
      const response = await fetch(apiUrl, {

        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },

      });

      const data = await response.json();

      if (data.error) {

        setError(`Error: ${data.error.message}`);

        return;

      }



      setOrganizations(data.organizations);

    } catch (error) {

      setError(`Error: ${error.message}`);

    }

  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };



  const handleFetchOrganizations = () => {
    fetchOrganizations();
  };


  return (
    <div className='parent-container'>
      <h2>Find Resources</h2>
      <div className='resources'>
        <label>
          Location:
          <input type="text" value={location} onChange={handleLocationChange}
            placeholder='postal zip code required'
          />
        </label>
        <button onClick={handleFetchOrganizations}>Fetch Organizations</button>
      </div>

      {organizations.length > 0 && (
        <div className='resource-list'>
          <h3>Organizations in {location}</h3>
          <ul>
            {organizations.map((organization) => (
              <li key={organization.id} className='organization-card'>
                {organization.name} - {organization.phone} - {organization.email}
                <br>
                </br>
                {organization.distance} Miles away

              </li>

            ))}

          </ul>

        </div>

      )}

    </div>

  );

};



export default Resources;

