import React from 'react';
import stops from '../data/subway-stops';

const getSortedStops = line => {
  const filteredStops = stops.filter(stop => stop.hasOwnProperty(line));
  return filteredStops.sort((a, b) => {
    return a[line] - b[line];
  });
};

const SelectStop = ({line}) => (
  <select>
    {
      getSortedStops(line).map(stop => (
        <option key={stop.OBJECTID} value={stop.OBJECTID}>{stop.NAME}</option>
      ))
    }
  </select>
);

export default SelectStop;
