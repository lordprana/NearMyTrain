import React from 'react';
import {connect} from 'react-redux';

const Loader = ({loading}) => (
  <div className={
    loading
    ? 'loader-container loader-container-active'
    : 'loader-container'
  }>
    <div className="spinner">
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  </div>
);


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    loading: state.searchResults.fetching,
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Loader);
