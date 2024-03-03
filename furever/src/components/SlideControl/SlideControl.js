import React, { useEffect, useState } from 'react';
import './SlideControl.css';


const SlideControl = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);  //? maybe
  const [error, setError] = useState(null); //? maybe
  //paginate each card?
  useEffect(() => {
    const getAccessToken = async () => {
      const client_id = process.env.REACT_APP_API_KEY;
      const client_secret = process.env.REACT_APP_API_SECRET;
      const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error getting access token:', data.error);
        return null;
      }

      return data.access_token;
    };

    const makeApiRequest = async () => {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        console.error('Unable to get access token. Exiting.');
        return;
      }

      const apiEndpoint = 'https://api.petfinder.com/v2/animals';
      const apiUrl = `${apiEndpoint}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const responseData = await response.json();

      setApiData(responseData);
    };

    makeApiRequest();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {apiData && apiData.animals && apiData.animals.length > 0 && (
        <div className="animal-details">
          {apiData.animals[0].photos[0] && (
            <img
              src={
                (apiData.animals[0].photos[0].medium &&
                  apiData.animals[0].photos[0].medium) ||
                (apiData.animals[0].photos[0].large &&
                  apiData.animals[0].photos[0].large) ||
                (apiData.animals[0].photos[0].small &&
                  apiData.animals[0].photos[0].small)
              }
              alt={apiData.animals[0].name}
            />
          )}
          <h2>{apiData.animals[0].name}</h2>
          <p>Type: {apiData.animals[0].type}</p>
          <p>Breed: {apiData.animals[0].breeds.primary}</p>
          <p>Age: {apiData.animals[0].age}</p>
          <p>Description: {apiData.animals[0].description}</p>
        </div>
      )}
    </div>
  );
};


export default SlideControl;