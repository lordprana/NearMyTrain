import React from 'react';
import {SelectStop, SelectLine, MapContainer, Search, Options} from './index';

const Home = () => (
  <div>
    <MapContainer />
    <Options />
    <SelectLine />
    <SelectStop />
    <Search />
  </div>
);

export default Home;
