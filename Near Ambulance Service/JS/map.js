
  // Initialize map centered at Madurai
  const map = L.map('map').setView([9.9252, 78.1198], 13);

  // OpenStreetMap tiles (FREE)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Sample hospital locations
  const hospitals = [
    {
      name: "Apollo Speciality Hospital",
      lat: 9.9195,
      lng: 78.1480
    },
    {
      name: "Meenakshi Mission Hospital",
      lat: 9.9545,
      lng: 78.1185
    },
    {
      name: "Velammal Hospital",
      lat: 9.9602,
      lng: 78.1410
    }
  ];

  // Add markers
  hospitals.forEach(hospital => {
    L.marker([hospital.lat, hospital.lng])
      .addTo(map)
      .bindPopup(`<b>${hospital.name}</b>`)
  });

const ambulanceIcon = L.icon({
  iconUrl: 'Images/ambulance.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

L.marker([9.9252, 78.1198], { icon: ambulanceIcon })
  .addTo(map)
  .bindPopup("Ambulance - Available");


  // show driver lcation
  navigator.geolocation.getCurrentPosition(function(position) {

  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  L.marker([lat, lng], { icon: ambulanceIcon })
    .addTo(map)
    .bindPopup("Driver Current Location")
    .openPopup();

  map.setView([lat, lng], 14);

});

// show  nearest hospital automatically
function getDistance(lat1, lon1, lat2, lon2) {
  return Math.sqrt(
    Math.pow(lat2 - lat1, 2) +
    Math.pow(lon2 - lon1, 2)
  );
}


// draw route from ambulance to hospital
L.Routing.control({
  waypoints: [
    L.latLng(driverLat, driverLng),
    L.latLng(hospitalLat, hospitalLng)
  ]
}).addTo(map);


let status;

// status color
function getStatusColor(driverStatus) {
  if (driverStatus === "Available") return "green";
  if (driverStatus === "On Duty") return "orange";
  if (driverStatus === "Busy") return "red";
  return "gray";
}


L.circleMarker([lat, lng], {
  color: getStatusColor(driverStatus),
  radius: 8,
  fillColor: getStatusColor(driverStatus),
  fillOpacity: 0.8
}).addTo(map);

