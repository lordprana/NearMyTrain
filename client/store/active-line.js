/**
 * ACTION TYPES
 */
const SET_ACTIVE_LINE = 'SET_ACTIVE_LINE';

/**
 * INITIAL STATE
 */
const defaultLine = '1';

/**
 * ACTION CREATORS
 */
export const setActiveLine = line => ({type: SET_ACTIVE_LINE, line});

/**
 * REDUCER
 */
export default function (state = defaultLine, action) {
  switch (action.type) {
    case SET_ACTIVE_LINE:
      return action.line;
    default:
      return state;
  }
}
