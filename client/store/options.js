/**
 * ACTION TYPES
 */
const SET_OPTIONS = 'SET_OPTIONS';

/**
 * INITIAL STATE
 */
const defaultOptions = {
  numStops: 3,
  walkingDistance: 0.2
};

/**
 * ACTION CREATORS
 */
export const setOptions = options => ({type: SET_OPTIONS, options});

/**
 * REDUCER
 */
export default function (state = defaultOptions, action) {
  switch (action.type) {
    case SET_OPTIONS:
      return action.options;
    default:
      return state;
  }
}
