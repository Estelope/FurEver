import React, { useEffect, useState } from 'react';


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
      {apiData && (
        <div>
          {} //data
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
  };

  export default SlideControl;