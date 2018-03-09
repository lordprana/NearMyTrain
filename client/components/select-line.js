import React from 'react';
import {connect} from 'react-redux';
import lines from '../data/subway-lines';
import {setActiveLine} from '../store';

const handleClick = (line, dispatchSetActiveLine) => evt => {
  // Handle presentation of active icon
  [...document.getElementsByClassName('select-line-icon')].forEach(element => {
    element.classList.remove('active-select-line-icon');
  })
  evt.target.classList.add('active-select-line-icon');

  // Update active icon in store
  dispatchSetActiveLine(line);
}

const SelectLine = ({dispatchSetActiveLine}) => (
  <div className="select-line-container-for-scroll" >
    <div className="select-line-container">
      <img
        onClick={handleClick('1', dispatchSetActiveLine)}
        key={lines[0].line}
        className="select-line-icon active-select-line-icon"
        src={lines[0].icon} />
      {
        lines.slice(1).map(line => (
          <img
            onClick={handleClick(line.line, dispatchSetActiveLine)}
            key={line.line}
            className="select-line-icon"
            src={line.icon} />
        ))
      }
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = dispatch => {
  return {
    dispatchSetActiveLine: line => {
      dispatch(setActiveLine(line));
    }
  }
};

export default connect(mapState, mapDispatch)(SelectLine);
