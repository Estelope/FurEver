import React from 'react';

const MatchesComponent = ({ matchedAnimals }) => {
  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matchedAnimals.map((animal, idx) => (
          <li key={idx}>{animal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesComponent;