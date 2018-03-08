import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import {connect} from 'react-redux';

const NEW_YORK_COORDINATES = [-74.006, 40.7128];

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWF0dGhld2dhYmEiLCJhIjoiY2phNDJidWQxMnM1bzJ6bDdyb2xzdHFvbCJ9.o4O6sDd2I05FoooBkapplg'
});

const displayResultName = index => () => {
  const resultNames = document.getElementsByClassName('result-name');
  [...resultNames].forEach(result => {
    if (result.id !== `result-name-${index}`) result.classList.remove('show');
  });
  const showResult = document.getElementById(`result-name-${index}`);
  showResult.classList.toggle('show');
};

const MapContainer = ({homeStation, nearbyStations, searchResults}) => {

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{
        height: '80vh',
        width: '100vw'
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
      {
        !searchResults.fetching && searchResults.results.length
        && searchResults.results.map((result, i) => (
          <Marker
            key={i}
            coordinates={[result.geometry.location.lng(),
                          result.geometry.location.lat()]}
            anchor="bottom">
            <div className="result-anchor" onClick={displayResultName(i)}>
              <div id={`result-name-${i}`} className="result-name">
                <a href={`https://www.google.com/maps/search/?api=1&query_place_id=${result.place_id}&query=none`} target="_blank">
                  {result.name}
                </a>
              </div>
              <img src={result.icon} height="24" width="24" />
            </div>
          </Marker>
        ))
      }
    </Map>
  );
};


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    homeStation: state.homeStation,
    nearbyStations: state.nearbyStations,
    searchResults: state.searchResults
  };
};

const mapDispatch = null;

export default connect(mapState, mapDispatch)(MapContainer);
