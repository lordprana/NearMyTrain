import React from 'react';
import {SelectStop, SelectLine, MapContainer, Search} from './index';

const Home = () => (
  <div>
    <MapContainer />
    <SelectLine />
    <SelectStop />
    <Search />
  </div>
);

export default Home;
