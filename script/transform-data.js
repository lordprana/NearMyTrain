const fs = require('fs');
let subwayStops = require('./subway-stops-orig.json');

// function distance(lat1, lon1, lat2, lon2) {
// 	var radlat1 = Math.PI * lat1 / 180;
// 	var radlat2 = Math.PI * lat2 / 180;
// 	var theta = lon1 - lon2;
// 	var radtheta = Math.PI * theta / 180;
// 	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
// 	dist = Math.acos(dist);
// 	dist = dist * 180 / Math.PI;
// 	dist = dist * 60 * 1.1515;
// 	return dist;
// }

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function convertToLatLng(geom) {
  // Latitude and longitude are reversed in the dataset
  const lngRegex = /\((-[0-9]+\.[0-9]+) /;
  const latRegex = / ([0-9]+\.[0-9]+)\)/;
  return [+geom.match(latRegex)[1], +geom.match(lngRegex)[1]];
}

const lines = [
  {
    line: 'A',
    terminalStop: 'Inwood - 207th St'
  },
  {
    line: 'C',
    terminalStop: '168th St'
  },
  {
    line: 'E',
    terminalStop: 'Jamaica Ctr - Parsons / Archer'
  }
];

lines.forEach(line => {
  let stopsOnLine = subwayStops.filter(stop => {
    // For 'E' line, make sure not to match 'Express' in LINE information
    if (line.line === 'E') {
      if (stop.LINE.includes(line.line) && !stop.LINE.includes('Express')) {
        return true;
      }
    } else if (stop.LINE.includes(line.line)) {
      return true;
    }
    return false;
  });

  const terminalStop = stopsOnLine.find(stop => {
    if (stop.NAME === line.terminalStop && stop.LINE.includes(line.line)) {
      return true;
    }
  });

  stopsOnLine = stopsOnLine.map(stop => {
    let [termLat, termLng] = convertToLatLng(terminalStop.the_geom);
    let [stopLat, stopLng] = convertToLatLng(stop.the_geom);
    stop.lat = stopLat;
    stop.lng = stopLng;
    stop.distance = distance(termLat, termLng, stopLat, stopLng);
    return stop;
  });

  let sortedStopsOnLine = stopsOnLine.sort((a, b) => {
    return a.distance - b.distance;
  });

  sortedStopsOnLine.forEach((stop, i) => {
    subwayStops = subwayStops.map(s => {
      if (s.OBJECTID === stop.OBJECTID) {
        s[line.line] = i;
      }
      delete s.distance;
      return s;
    });
  });
});

fs.writeFile('subway-stops-transformed.json', JSON.stringify(subwayStops));

