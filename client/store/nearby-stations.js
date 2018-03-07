/**
 * ACTION TYPES
 */
const SET_NEARBY_STATIONS = 'SET_NEARBY_STATIONS';

/**
 * INITIAL STATE
 */
const defaultNearbyStations = [];

/**
 * ACTION CREATORS
 */
export const setNearbyStations = stations => ({type: SET_NEARBY_STATIONS, stations});

/**
 * REDUCER
 */
export default function (state = defaultNearbyStations, action) {
  switch (action.type) {
    case SET_NEARBY_STATIONS:
      return action.stations;
    default:
      return state;
  }
}
