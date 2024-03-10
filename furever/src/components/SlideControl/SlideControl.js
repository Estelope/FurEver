import React, { useEffect, useState, useRef } from 'react';
import './SlideControl.css';
import SwipeableViews from "react-swipeable-views-react-18-fix";
import images from '../../constants/images'


const SlideControl = ({animalType, location}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null); //? maybe
  const [forceUpdate, setForceUpdate] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [matchedAnimals, setMatchedAnimals] = useState([]);

  const buttonClickedRef = useRef(buttonClicked);
  buttonClickedRef.current = buttonClicked;

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
console.log(apiData)
    const fetchInitialData = async () => {
      const token = await getAccessToken();

      if (!token) {
        console.error('Unable to get access token. Exiting.');
        return;
      }

      setAccessToken(token);

      const apiEndpoint = 'https://api.petfinder.com/v2/animals';
      const apiUrl = `${apiEndpoint}?type=${animalType}&location=${location}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      setApiData(responseData);
    };

    fetchInitialData();
  }, [, animalType, location]);

  const refreshApiData = async () => {
    try {
      const token = await getAccessToken();
      setAccessToken(token);

      const apiEndpoint = 'https://api.petfinder.com/v2/animals';
      const apiUrl = `${apiEndpoint}?type=${animalType}&location=${location}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      console.log('Refreshed API Data:', responseData);

      setApiData(responseData);
      setIndex(0);
      setForceUpdate((prev) => !prev);
    } catch (error) {
      console.error('Error refreshing API data:', error);
    }
  };

  const handleSwipe = (index) => {
    setIndex(index);
    console.log(apiData)
  };

  const handleSwipeRight = () => {
    const currentAnimal = apiData.animals[index];
    setMatches((prevMatches) => [...prevMatches, currentAnimal.id]);
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handleSwipeLeft = async () => {
    
    setIndex((prevIndex) => (prevIndex + 1) );
  };

  const handleCardClick = (idx) => {
    if (!buttonClickedRef.current) {
      setFlippedIndex(flippedIndex === idx ? null : idx);
    }
    setButtonClicked(false); 
  };



  const getSentence = (text) => {
    if (text && typeof text === 'string') {
      return text.split(/(?<=[,.!?])\s+/).filter(sentence => sentence.trim() !== '' && !sentence.trim().endsWith('...'));
    } else {
      return [];
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {apiData && apiData.animals && apiData.animals.length > 0 && apiData.animals[0].photos && apiData.animals[0].photos.length > 0 && (
        <SwipeableViews
          enableMouseEvents
          index={index}
          onChangeIndex={handleSwipe}
          onSwipeRight={handleSwipeRight}
          onSwipeLeft={handleSwipeLeft}
        >
          {apiData.animals
              .filter((animal) => animal.photos && animal.photos.length > 0)
            .map((animal, idx) => (
              <div key={idx} className={`react-swipeable-view-container ${flippedIndex === idx ? 'flipped' : ''}`}
                onClick={() => handleCardClick(idx)}>
                <div className={`react-swipeable-view-slide${flippedIndex === idx ? ' flipped' : ''}`}>
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
                    <p>Distance:<b> {parseInt(animal.distance)} Miles</b></p>
                  </div>
                  <div className="animal-details-back">
                    <h2>{animal.name}</h2>
                    <p> {getSentence(animal.description)}</p>
                    <p><b>Attributes</b><br>
                    </br> Spayed/Neutered: {animal.attributes.spayed_neutered ? 'Yes' : 'No'}<br></br>
                      House Trained: {animal.attributes.house_trained ? 'Yes' : 'No'}<br></br>
                      Shots current: {animal.attributes.shots_current ? 'Yes' : 'No'}<br></br>
                      status: {animal.status}
                    </p>
                    <p><b>Tags</b><br></br>   {animal.tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && ' • '}
                        <b>{tag}</b>
                      </React.Fragment>
                    ))}</p>
                    <p><b>Contact Info</b><br></br> email: {animal.contact.email}</p>
                    <p> phone: {animal.contact.phone} </p>
                    <button class="favorite-button" aria-label="Favorite"
                    onClick={() => {
                      setButtonClicked(true);                     
                    }}
                    >
                      <br></br> 
                      <img className="heart-icon" src={images.heartborder} alt="Empty Heart" />
                    
                    </button>

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