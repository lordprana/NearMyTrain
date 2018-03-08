import React from 'react';
import {SelectStop, MapContainer, Search} from './index';

const Home = () => (
  <div>
    <MapContainer />
    <SelectStop line="A"/>
    <Search />
  </div>
);

export default Home;
