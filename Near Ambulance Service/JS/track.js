// Initialize map
let map = L.map('map').setView([9.9252, 78.1198], 12); // Default Madurai

// Add OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "© OpenStreetMap"
}).addTo(map);

let userMarker;
let ambulanceMarker;

// Get User Location Automatically
navigator.geolocation.getCurrentPosition(function(position) {

    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;

    userMarker = L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("📍 Your Location")
        .openPopup();

    map.setView([userLat, userLng], 13);

});

// Sample ambulance data (Demo only)
const ambulanceData = {
    "AMB101": { lat: 9.9200, lng: 78.1200 },
    "AMB102": { lat: 9.9350, lng: 78.1000 },
    "AMB103": { lat: 9.9100, lng: 78.1400 }
};

// Search function
function searchAmbulance() {

    const id = document.getElementById("searchID").value.trim().toUpperCase();

    if (!ambulanceData[id]) {
        alert("Ambulance ID not found!");
        return;
    }

    const ambLat = ambulanceData[id].lat;
    const ambLng = ambulanceData[id].lng;

    // Remove old marker
    if (ambulanceMarker) {
        map.removeLayer(ambulanceMarker);
    }

    ambulanceMarker = L.marker([ambLat, ambLng])
        .addTo(map)
        .bindPopup("🚑 Ambulance: " + id)
        .openPopup();

    map.setView([ambLat, ambLng], 13);

    calculateDistance(ambLat, ambLng);
    findNearestHospital(ambLat, ambLng);
}


// Distance calculation (Haversine Formula)
function calculateDistance(ambLat, ambLng) {

    navigator.geolocation.getCurrentPosition(function(position) {

        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const R = 6371; // km
        const dLat = (ambLat - userLat) * Math.PI / 180;
        const dLng = (ambLng - userLng) * Math.PI / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userLat * Math.PI / 180) *
            Math.cos(ambLat * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        document.getElementById("distanceInfo").innerText =
            "🚑 Ambulance is " + distance.toFixed(2) + " KM away from you.";
    });
}

// Sample hospital data (Madurai demo)
const hospitals = [
    { name: "Apollo Hospital", lat: 9.9170, lng: 78.1190 },
    { name: "Meenakshi Mission Hospital", lat: 9.9450, lng: 78.1400 },
    { name: "Velammal Hospital", lat: 9.9300, lng: 78.1000 }
];

function findNearestHospital(ambLat, ambLng) {

    let nearestHospital = null;
    let minDistance = Infinity;

    hospitals.forEach(hospital => {

        const distance = getDistance(ambLat, ambLng, hospital.lat, hospital.lng);

        if (distance < minDistance) {
            minDistance = distance;
            nearestHospital = hospital;
        }
    });

    showHospitalMarker(nearestHospital, minDistance);
}

function getDistance(lat1, lng1, lat2, lng2) {

    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

let hospitalMarker;

function showHospitalMarker(hospital, distance) {

    if (hospitalMarker) {
        map.removeLayer(hospitalMarker);
    }

    hospitalMarker = L.marker([hospital.lat, hospital.lng])
        .addTo(map)
        .bindPopup("🏥 Nearest Hospital: " + hospital.name +
                   "<br>Distance: " + distance.toFixed(2) + " KM")
        .openPopup();

    document.getElementById("distanceInfo").innerHTML =
        "🏥 Nearest Hospital: <b>" + hospital.name + "</b><br>" +
        "Distance from Ambulance: " + distance.toFixed(2) + " KM";
}
