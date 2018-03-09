export const queryPlaces = (location, radius, query, callback) => {
  const map = new google.maps.Map(document.getElementById('fake-map'));

  const loc = new google.maps.LatLng(location.lat, location.lng);

  const request = {
    location: loc,
    radius: radius,
    keyword: query
  };

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
};
