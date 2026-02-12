let selectedUserEmail = "";

// Sample booking details (simulate booking page data)
const bookingData = {
  1: {
    name: "Arun Kumar",
    age: 45,
    email: "arun@gmail.com",
    phone: "9876543210",
    from: "Madurai",
    to: "Chennai",
    pickup: "Anna Nagar",
    drop: "Apollo Hospital",
    date: "12-02-2026",
    time: "11:00 AM",
    condition: "Heart pain emergency"
  },
  2: {
    name: "Priya",
    age: 32,
    email: "priya@gmail.com",
    phone: "9876512345",
    from: "Coimbatore",
    to: "Salem",
    pickup: "RS Puram",
    drop: "GH Salem",
    date: "12-02-2026",
    time: "09:30 AM",
    condition: "Accident case"
  }
};

let selectedRequestId = null;

function viewRequest(id) {

  selectedRequestId = id;

  const data = bookingData[id];
  selectedUserEmail = data.email;

  const detailsHTML = `
    <p><strong>Patient Name:</strong> ${data.name}</p>
    <p><strong>Age:</strong> ${data.age}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <hr>
    <p><strong>From:</strong> ${data.from}</p>
    <p><strong>To:</strong> ${data.to}</p>
    <p><strong>Pickup Address:</strong> ${data.pickup}</p>
    <p><strong>Drop Address:</strong> ${data.drop}</p>
    <hr>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time}</p>
    <hr>
    <p><strong>Medical Condition:</strong> ${data.condition}</p>
  `;

  document.getElementById("bookingDetails").innerHTML = detailsHTML;
  document.getElementById("viewModal").style.display = "flex";
}

function confirmBooking() {

  // Change status to Approved
  const statusCell = document.getElementById("status-" + selectedRequestId);
  statusCell.innerHTML = `<span class="approved">Approved</span>`;

  alert("✅ Booking Confirmed!\nEmail sent to user: " + selectedUserEmail);

  closeModal();
}

function dismissBooking() {

  // Change status to Rejected
  const statusCell = document.getElementById("status-" + selectedRequestId);
  statusCell.innerHTML = `<span class="rejected">Rejected</span>`;

  alert("❌ Booking Dismissed.\nNotification email sent to user: " + selectedUserEmail);

  closeModal();
}

function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}
