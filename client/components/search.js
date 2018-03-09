import React from 'react';
import {connect} from 'react-redux';
import {addResultsNearStations} from '../store';

const convertMilesToMeters = mi => {
  return mi * 1609.344; // Conversion ratio
};

const handleSubmit = (stations, miles, dispatchAddResults) => evt => {
  evt.preventDefault();
  if (stations[0] !== null) {
    dispatchAddResults(stations, convertMilesToMeters(miles), evt.target.query.value);
  }
};


const Search = ({stations, miles, dispatchAddResults}) => (
  <form onSubmit={handleSubmit(stations, miles, dispatchAddResults)} className="search-form">
    <div className="search-input-container">
      <input type="text" name="query" placeholder="Search..." className="search-input" />
    </div>
  </form>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stations: [...state.nearbyStations, state.homeStation],
    miles: state.options.walkingDistance
  };
};

const mapDispatch = {
  dispatchAddResults: addResultsNearStations
};

export default connect(mapState, mapDispatch)(Search);
