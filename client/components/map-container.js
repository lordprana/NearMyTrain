import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const NEW_YORK_COORDINATES = [-74.006, 40.7128];

const MapContainer = () => {
  const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWF0dGhld2dhYmEiLCJhIjoiY2phNDJidWQxMnM1bzJ6bDdyb2xzdHFvbCJ9.o4O6sDd2I05FoooBkapplg'
  });

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={NEW_YORK_COORDINATES}/>
    </div>
  )
};

export default MapContainer;
