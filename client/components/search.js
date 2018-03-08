import React from 'react';
import {connect} from 'react-redux';
import {addResultsNearStations} from '../store';

const handleSubmit = (stations, dispatchAddResults) => evt => {
  evt.preventDefault();
  dispatchAddResults(stations, 100, evt.target.query.value);
};


const Search = ({stations, dispatchAddResults}) => (
  <form onSubmit={handleSubmit(stations, dispatchAddResults)} className="search-form">
    <input type="text" name="query" placeholder="search..." className="search-input"/>
    <button type="submit" value="Submit"><i className="fas fa-search"></i></button>
  </form>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    stations: [...state.nearbyStations, state.homeStation]
  };
};

const mapDispatch = {
  dispatchAddResults: addResultsNearStations
};

export default connect(mapState, mapDispatch)(Search);
