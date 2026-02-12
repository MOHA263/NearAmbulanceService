document.addEventListener("DOMContentLoaded", () => {
  loadNearbyAmbulances();
});

function loadNearbyAmbulances() {
  const ambulances = [
    {
      driverName: "Ravi Kumar",
      ambulanceNumber: "TN 01 AB 1234",
      distance: "1.2 km",
      contact: "9876543210"
    },
    {
      driverName: "Suresh",
      ambulanceNumber: "TN 09 CD 5678",
      distance: "2.5 km",
      contact: "9123456780"
    }
  ];

  const container = document.getElementById("ambList");
  container.innerHTML = "";

  ambulances.forEach(amb => {
    const card = document.createElement("div");
    card.className = "ambulance-card";

    card.innerHTML = `
      <h3>🚑 Ambulance</h3>
      <p><strong>Driver:</strong> ${amb.driverName}</p>
      <p><strong>Number:</strong> ${amb.ambulanceNumber}</p>
      <p><strong>Distance:</strong> ${amb.distance}</p>
      <button class="call-btn" onclick="callDriver('${amb.contact}')">
        📞 Call Driver
      </button>
    `;

    container.appendChild(card);
  });
}

function callDriver(number) {
  window.location.href = `tel:${number}`;
}
