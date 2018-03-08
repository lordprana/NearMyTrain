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

const calculateFitBounds = stations => {
  const west = stations.reduce((min, station) => {
    if (station.lng < min.lng) return station;
    else return min;
  });
  const south = stations.reduce((min, station) => {
    if (station.lat < min.lat) return station;
    else return min;
  });
  const east = stations.reduce((max, station) => {
    if (station.lng > max.lng) return station;
    else return max;
  });
  const north = stations.reduce((max, station) => {
    if (station.lat > max.lat) return station;
    else return max;
  });
  console.log([west.lng, south.lat, east.lng, north.lat]);
  //return [west.lng, south.lat, east.lng, north.lat];
  const padding = .01;
  return [west.lng - padding, south.lat - padding, east.lng + padding, north.lat + padding];
};

      // fitBounds={nearbyStations.length && calculateFitBounds(nearbyStations)}>
      // fitBounds={[40.824766360871905, -73.94408792823116, 40.86807199999737, -73.91989900100465]}>
      // center={(homeStation && [homeStation.lng, homeStation.lat])
      //   || NEW_YORK_COORDINATES}
const MapContainer = ({homeStation, nearbyStations, searchResults}) => {

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v8"
      containerStyle={{
        height: '100vh',
        width: '100vw'
      }}
      center={NEW_YORK_COORDINATES}
      fitBounds={nearbyStations.length && calculateFitBounds(nearbyStations)}>
      {
        homeStation &&
        <Marker
          coordinates={[homeStation.lng, homeStation.lat]}
          anchor="bottom">
          <div className="stations-marker">
            <img src="/images/home-station.png" />
            <div className="stations-marker-name">
              {homeStation.NAME}
            </div>
          </div>
        </Marker>
      }
      {
        nearbyStations.map(station => (
          <Marker
            key={station.OBJECTID}
            coordinates={[station.lng, station.lat]}
            anchor="bottom">
            <div className="stations-marker">
              <img src="/images/nearby-station.png" />
              <div className="stations-marker-name">
                {station.NAME}
              </div>
            </div>
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
