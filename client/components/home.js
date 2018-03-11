import React from 'react';
import {SelectStop, SelectLine, MapContainer, Search, Options, Loader} from './index';

const Home = () => (
  <div>
    <Loader />
    <MapContainer />
    <Options />
    <SelectLine />
    <SelectStop />
    <Search />
  </div>
);

export default Home;
