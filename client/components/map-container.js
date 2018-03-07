import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import {connect} from 'react-redux';

const NEW_YORK_COORDINATES = [-74.006, 40.7128];

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWF0dGhld2dhYmEiLCJhIjoiY2phNDJidWQxMnM1bzJ6bDdyb2xzdHFvbCJ9.o4O6sDd2I05FoooBkapplg'
});

const MapContainer = ({homeStation, nearbyStations}) => {

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}
      center={(homeStation && [homeStation.lng, homeStation.lat])
        || NEW_YORK_COORDINATES}
      zoom={[13]}>
      {
        homeStation &&
        <Marker
          coordinates={[homeStation.lng, homeStation.lat]}
          anchor="bottom">
          <img src="/images/home-station.png" />
        </Marker>
      }
      {
        nearbyStations.map(station => (
          <Marker
            key={station.OBJECTID}
            coordinates={[station.lng, station.lat]}
            anchor="bottom">
            <img src="/images/nearby-station.png" />
          </Marker>
        ))
      }
    </Map>
  )
};


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    homeStation: state.homeStation,
    nearbyStations: state.nearbyStations
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(MapContainer);
