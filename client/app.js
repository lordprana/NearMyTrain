import React from 'react';

import {Home} from './components';


const App = () => {
  return (
    <div>
      <Home />
      <div id="fake-map" /> { /* This needs to be here for Google Maps Places
                                 API */ }
    </div>
  );
};

export default App;
