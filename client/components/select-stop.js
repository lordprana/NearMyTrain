import React from 'react';
import {connect} from 'react-redux';
import stops from '../data/subway-stops';
import {setStations} from '../store';
import {queryPlaces} from '../api/google-places';

const getSortedStops = line => {
  const filteredStops = stops.filter(stop => stop.hasOwnProperty(line));
  return filteredStops.sort((a, b) => {
    return a[line] - b[line];
  });
};

const handleChange = (line, numStops, dispatchSetStations) => evt => {
  dispatchSetStations(stops[evt.target.value - 1], line, numStops, stops); // Object Ids are 1 indexed
}

const SelectStop = ({line, dispatchSetStations}) => (
  <select onChange={handleChange(line, 5, dispatchSetStations)}>
    {
      getSortedStops(line).map(stop => (
        <option key={stop.OBJECTID} value={stop.OBJECTID}>{stop.NAME}</option>
      ))
    }
  </select>
);

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = {
  dispatchSetStations: setStations,
};

export default connect(mapState, mapDispatch)(SelectStop);

