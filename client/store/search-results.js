import {queryPlaces} from '../api/google-places';

/**
 * ACTION TYPES
 */
const ADD_SEARCH_RESULTS = 'ADD_SEARCH_RESULTS';
const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
const FETCHED_SEARCH_RESULTS = 'FETCHED_SEARCH_RESULTS';

/**
 * INITIAL STATE
 */
const defaultSearchResults = {
  results: [],
  fetching: false
};

/**
 * ACTION CREATORS
 */
const addSearchResults = results => ({type: ADD_SEARCH_RESULTS, results});
const clearSearchResults = () => ({type: CLEAR_SEARCH_RESULTS});
const fetchSearchResults = () => ({type: FETCH_SEARCH_RESULTS});
const fetchedSearchResults = () => ({type: FETCHED_SEARCH_RESULTS});

/**
 * THUNK CREATORS
 */
export const addResultsNearStations = (stations, radius, query) =>
  dispatch => {
    let numResults = 0;
    dispatch(clearSearchResults());
    dispatch(fetchSearchResults());
    stations.forEach((station, i) => {
      setTimeout(() => {
        queryPlaces({ lat: station.lat, lng: station.lng }, radius, query,
          (results, status) => {
            if (results !== null) dispatch(addSearchResults(results));
            numResults++;
            if (numResults === stations.length) {
              dispatch(fetchedSearchResults());
            }
          });
      }, 50 * i);
    });
  };

/**
 * REDUCER
 */
export default function (state = defaultSearchResults, action) {
  switch (action.type) {
    case CLEAR_SEARCH_RESULTS:
      return defaultSearchResults;
    case ADD_SEARCH_RESULTS:
      return {
        results: [...state.results, ...action.results],
        fetching: state.fetching
      };
    case FETCH_SEARCH_RESULTS:
      return {
        results: state.results,
        fetching: true
      };
    case FETCHED_SEARCH_RESULTS:
      return {
        results: state.results,
        fetching: false
      };
    default:
      return state;
  }
}
