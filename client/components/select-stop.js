import React from 'react';
import {connect} from 'react-redux';
import stops from '../data/subway-stops';
import {setStations} from '../store';

const getSortedStops = line => {
  const filteredStops = stops.filter(stop => stop.hasOwnProperty(line));
  return filteredStops.sort((a, b) => {
    return a[line] - b[line];
  });
};

const handleChange = (line, numStops, dispatchSetStations) => evt => {
  dispatchSetStations(stops[evt.target.value - 1], line, numStops, stops); // Object Ids are 1 indexed
};

// const SelectStop = ({line, numStops, dispatchSetStations}) => {
//   return (
//     <select
//       onChange={handleChange(line, numStops, dispatchSetStations)}
//       className="home-station-select"
//       defaultValue="disabled">
//       <option value="disabled">Choose home stop</option>
//       {
//         getSortedStops(line).map(stop => (
//           <option key={stop.OBJECTID} value={stop.OBJECTID}>{stop.NAME}</option>
//         ))
//       }
//     </select>
// );};

const SelectStop = ({line, numStops, homeStation, dispatchSetStations}) => {
  return (
    <div className="select-stop">
      <div className="select-stop-text">Choose your home station</div>
      <img className="select-stop-home" src="images/home.png" />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    line: state.activeLine,
    numStops: state.options.numStops,
    homeStation: state.homeStation
  };
};

const mapDispatch = {
  dispatchSetStations: setStations,
};

export default connect(mapState, mapDispatch)(SelectStop);

