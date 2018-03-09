import React from 'react';
import {connect} from 'react-redux';
import {SelectStop, SelectLine, MapContainer, Search, Options, Loader} from './index';

const Home = ({loading}) => (
  <div>
    {
      loading && <Loader />
    }
    <MapContainer />
    <Options />
    <SelectLine />
    <SelectStop />
    <Search />
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

export default connect(mapState, mapDispatch)(Home);
