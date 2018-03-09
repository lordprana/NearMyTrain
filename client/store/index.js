import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import homeStation from './home-station';
import nearbyStations from './nearby-stations';
import searchResults from './search-results';
import activeLine from './active-line';

const reducer = combineReducers({homeStation, nearbyStations, searchResults, activeLine});
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './home-station';
export * from './nearby-stations';
export * from './search-results';
export * from './active-line';
