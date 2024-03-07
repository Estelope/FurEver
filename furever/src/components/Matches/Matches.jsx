import React, { useState } from 'react';

import './Matches.css';

const MatchesComponent = ({ matchedAnimals }) => {

  return (
    <div className='matches-container'>
      <h2>Matches</h2>
      <ul>
        {matchedAnimals.length > 0 ? (
          matchedAnimals.map((animal, idx) => (
            <li key={idx}>{animal.name}</li>
          ))
        ) : (
          <li>No matches yet</li>
        )}
      </ul>
    </div>
  );
};

export default MatchesComponent;