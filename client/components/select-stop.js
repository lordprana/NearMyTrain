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

const handleStationSelect = (stationId, line, numStops, dispatchSetStations) => () => {
  dispatchSetStations(stops[stationId - 1], line, numStops, stops); // Station Ids are 1 indexed
};

const showStopList = () => {
  document.getElementById('stop-list-background').classList
    .add('stop-list-background-active');
};

const hideStopList = () => {
  document.getElementById('stop-list-background').classList
    .remove('stop-list-background-active');
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
    <div className="select-stop-parent">
      <div className="select-stop" onClick={showStopList}>
        <div className="select-stop-text">
          {
            homeStation && homeStation.LINE.includes(line)
            ? homeStation.NAME
            : 'Choose your home station'
          }
         </div>
        <img className="select-stop-home" src="images/home.png" />
      </div>
      <div
        id="stop-list-background"
        className="stop-list-background"
        onClick={hideStopList}>
        <div className="stop-list">
          {
            getSortedStops(line).map(stop => (
              <div
                key={stop.OBJECTID}
                onClick={handleStationSelect(stop.OBJECTID, line, numStops,
                                             dispatchSetStations)}>
                <div className="stop-list-item">{stop.NAME}</div>
                <hr />
              </div>
            ))
          }
        </div>
      </div>
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

