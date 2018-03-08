import {setNearbyStations} from './nearby-stations';

/**
 * ACTION TYPES
 */
const SET_HOME_STATION = 'SET_HOME_STATION';

/**
 * INITIAL STATE
 */
const defaultHomeStation = null;

/**
 * ACTION CREATORS
 */
export const setHomeStation = station => ({type: SET_HOME_STATION, station});

/**
 * THUNK CREATORS
 */
export const setStations = (homeStation, line, numStops, stationData) =>
  dispatch => {
    const nearbyStations = stationData.filter(station => {
      if (station.hasOwnProperty(line)
        && station[line] <= homeStation[line] + numStops
        && station[line] >= homeStation[line] - numStops
        && station.OBJECTID !== homeStation.OBJECTID) {
          return true;
        } else {
          return false;
        }
    });
    dispatch(setNearbyStations(nearbyStations));
    dispatch(setHomeStation(homeStation));
  }

/**
 * REDUCER
 */
export default function (state = defaultHomeStation, action) {
  switch (action.type) {
    case SET_HOME_STATION:
      return action.station;
    default:
      return state;
  }
}
