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
    line: '1',
    terminalStop: 'Van Cortlandt Park - 242nd St'
  },
  {
    line: '2',
    terminalStop: 'Wakefield - 241st St'
  },
  {
    line: '3',
    terminalStop: 'Harlem - 148 St'
  },
  {
    line: '4',
    terminalStop: 'Woodlawn'
  },
  {
    line: '5',
    terminalStop: 'Eastchester - Dyre Ave'
  },
  {
    line: '6',
    terminalStop: 'Pelham Bay Park'
  },
  {
    line: '7',
    terminalStop: 'Flushing - Main St'
  },
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
  },
  {
    line: 'D',
    terminalStop: 'Norwood - 205th St'
  },
  {
    line: 'F',
    terminalStop: 'Jamaica - 179th St'
  },
  {
    line: 'G',
    terminalStop: 'Long Island City - Court Sq'
  },
  {
    line: 'J',
    terminalStop: 'Jamaica Ctr - Parsons / Archer'
  },
  {
    line: 'L',
    terminalStop: '8th Ave'
  },
  {
    line: 'N',
    terminalStop: 'Astoria - Ditmars Blvd'
  },
  {
    line: 'Q',
    terminalStop: '96th St'
  },
  {
    line: 'R',
    terminalStop: 'Forest Hills - 71st Av'
  }
];

function removeCurrentStop(stopsOnLine, currentStop) {
  const removeIndex = stopsOnLine.findIndex(stop => {
    return stop.OBJECTID === currentStop.OBJECTID;
  })
  stopsOnLine.splice(removeIndex, 1);
}

function findClosestStop(stopsOnLine, currentStop) {
  stopsOnLine = stopsOnLine.map(stop => {
    let [termLat, termLng] = convertToLatLng(currentStop.the_geom);
    let [stopLat, stopLng] = convertToLatLng(stop.the_geom);
    stop.lat = stopLat;
    stop.lng = stopLng;
    stop.distance = distance(termLat, termLng, stopLat, stopLng);
    return stop;
  });
  return stopsOnLine.reduce((min, stop) => {
    if (min.distance < stop.distance) return min;
    else return stop;
  })

}

lines.forEach(line => {
  let stopsOnLine = subwayStops.filter(stop => {
    // For 'E' line, make sure not to match 'Express' in LINE information
    let regex = new RegExp(line.line + '.{0,6}-all');
    if (line.line === 'E') {
      if (stop.NOTES.match(regex) && !stop.LINE.includes('Express')) {
        return true;
      }
    } else if (stop.NOTES.match(regex)) {
      return true;
    }
    return false;
  });

  const terminalStop = stopsOnLine.find(stop => {
    if (stop.NAME === line.terminalStop && stop.LINE.includes(line.line)) {
      return true;
    }
  });

  let sortedStopsOnLine = [];
  let currentStop = terminalStop;
  sortedStopsOnLine.push(currentStop);
  while (stopsOnLine.length) {
    currentStop = findClosestStop(stopsOnLine, currentStop);
    removeCurrentStop(stopsOnLine, currentStop);
    sortedStopsOnLine.push(currentStop);
  }

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

