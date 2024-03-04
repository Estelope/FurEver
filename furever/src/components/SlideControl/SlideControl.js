import React, { useEffect, useState } from 'react';
import './SlideControl.css';
import SwipeableViews from "react-swipeable-views-react-18-fix";



const SlideControl = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null); //? maybe

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

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = await getAccessToken();

      if (!token) {
        console.error('Unable to get access token. Exiting.');
        return;
      }

      setAccessToken(token);

      const apiEndpoint = 'https://api.petfinder.com/v2/animals';
      const apiUrl = `${apiEndpoint}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setApiData(responseData);
    };

    fetchInitialData();
  }, []);

  const refreshApiData = async () => {
    try {
      const token = await getAccessToken();
      setAccessToken(token);

      const apiEndpoint = 'https://api.petfinder.com/v2/animals';
      const apiUrl = `${apiEndpoint}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setApiData(responseData);
      setIndex(0);
    } catch (error) {
      console.error('Error refreshing API data:', error);
    }
  };

  const handleSwipe = (index) => {
    setIndex(index);
    setAnimate(true);
  };

  const handleSwipeRight = () => {
    const currentAnimal = apiData.animals[index];
    setMatches((prevMatches) => [...prevMatches, currentAnimal.id]);
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeLeft = () => {
  refreshApiData();
  setIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {apiData && apiData.animals && apiData.animals.length > 0 && apiData.animals[0].photos && apiData.animals[0].photos.length > 0 && (

        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={handleSwipe} onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
        >
          {apiData.animals.map((animal, idx) => (
            <div className="react-swipeable-view-container">
              <div key={idx} className={'react-swipeable-view-slide'}>
                <div className="animal-details">
                  <h2>{animal.name}</h2>

                  {animal.photos[0] && (
                    <img
                      src={
                        (animal.photos[0].medium && animal.photos[0].medium) ||
                        (animal.photos[0].large && animal.photos[0].large) ||
                        (animal.photos[0].small && animal.photos[0].small)
                      }
                      alt={animal.name}
                    />
                  )}
                  <p>Type: {animal.type}</p>
                  <p>Breed: {animal.breeds.primary}</p>
                  <p>Age: {animal.age} </p>
                  {/*<p>Description: {animal.description}</p>    move to flippable side with other pet data and contact info */}
                </div>
              </div>
            </div>
          ))}
        </SwipeableViews>
      )}
    </div>
  );
};


export default SlideControl;