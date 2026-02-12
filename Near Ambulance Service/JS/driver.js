document.addEventListener("DOMContentLoaded", loadDriver);

// 🔹 Load driver details
/* function loadDriver() {
    fetch("/api/driver/me")
        .then(res => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then(d => {
            document.getElementById("driver").innerText = d.driverName;
            document.getElementById("driverName").innerText = d.driverName;
            document.getElementById("driverId").innerText = d.driverId;
            document.getElementById("ambulance").innerText = d.ambulanceNumber;
            document.getElementById("contact").innerText = d.contactNumber;

            if (d.photo) {
                document.getElementById("photo").src = "/uploads/" + d.photo;
            }

            const statusMap = {
                "AVAILABLE": "Available",
                "ON_DUTY": "On Duty",
                "BUSY": "Busy"
            };

            document.getElementById("status-filter").value = statusMap[d.status] || "";
        })
        .catch(err => console.error("Load failed", err));
}

// 🔹 Update status
document.querySelector(".btn-update-status").addEventListener("click", () => {
    const uiStatus = document.getElementById("status-filter").value;
    const result = document.getElementById("result");

    if (!uiStatus) {
        result.style.color = "red";
        result.innerText = "Please select a status";
        return;
    }

    const backendStatus = {
        "Available": "AVAILABLE",
        "On Duty": "ON_DUTY",
        "Busy": "BUSY"
    }[uiStatus];

    fetch("/api/driver/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: backendStatus })
    })
        .then(() => {
            result.style.color = "green";
            result.innerText = "Status updated successfully";
        })
        .catch(() => {
            result.style.color = "red";
            result.innerText = "Status update failed";
        });
});

// 🔹 Edit profile
function editProfile() {
    document.getElementById("editModal").style.display = "flex";

    document.getElementById("editAmbulance").value =
        document.getElementById("ambulance").innerText;
    document.getElementById("editContact").value =
        document.getElementById("contact").innerText;
}

function closeEdit() {
    document.getElementById("editModal").style.display = "none";
}

// 🔹 Save profile (FIXED)
function saveProfile() {
    const formData = new FormData();

    const photo = document.getElementById("editPhoto").files[0];
    const ambulance = document.getElementById("editAmbulance").value.trim();
    const contact = document.getElementById("editContact").value.trim();

    if (!ambulance || !contact) {
        alert("All fields required");
        return;
    }

    if (photo) formData.append("photo", photo);
    formData.append("ambulanceNumber", ambulance);
    formData.append("contactNumber", contact);

    fetch("/api/driver/update-profile", {
        method: "PUT",
        body: formData
    })
        .then(res => {
            if (!res.ok) throw new Error("Update failed");
            alert("Profile updated successfully");
            closeEdit();
            loadDriver();
        })
        .catch(() => alert("Profile update failed"));
}

// 🔹 Share location every 20 seconds
setInterval(sendLocation, 20000);

function sendLocation() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(pos => {
        fetch(`/api/driver/update-location?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`, {
            method: "POST"
        })
            .then(res => res.text())
            .then(city => {
                const loc = document.getElementById("location");
                if (loc) loc.innerText = city;
            });
    });
}

// 🔹 Delete profile
function deleteProfile() {
    document.getElementById("deletePopup").style.display = "flex";
}

function closeDeletePopup() {
    document.getElementById("deletePopup").style.display = "none";
}

function confirmDelete() {
    const password = document.getElementById("deletePassword").value;
    const msg = document.getElementById("deleteMsg");

    if (!password) {
        msg.innerText = "Password required";
        msg.style.color = "red";
        return;
    }

    fetch("/api/driver/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    })
        .then(res => {
            if (!res.ok) throw new Error("Wrong password");
            alert("Profile deleted successfully");
            window.location.href = "/logout";
        })
        .catch(() => {
            msg.innerText = "Incorrect password";
            msg.style.color = "red";
        });
}
 */


function updateStatus() {
    const status = document.getElementById("status-filter").value;

    if (!status) {
        alert("Please select status");
        return;
    }

    document.getElementById("result").innerText = `Current Status: ${status}`;
    alert("Status updated successfully!");
}

function editProfile() {
    document.getElementById("editModal").classList.add("show");
}

function closeEdit() {
    document.getElementById("editModal").classList.remove("show");
}

function saveProfile() {

    const ambulance = document.getElementById("editAmbulance").value.trim();
    const contact = document.getElementById("editContact").value.trim();
    const photoInput = document.getElementById("editPhoto");

    if (!ambulance || !contact) {
        alert("All fields are required!");
        return;
    }

    // Contact validation
    if (!/^[0-9]{10}$/.test(contact)) {
        alert("Enter valid 10-digit contact number");
        return;
    }

    document.getElementById("ambulance").innerText = ambulance;
    document.getElementById("contact").innerText = contact;

    // Update photo preview
    if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("photo").src = e.target.result;
        }
        reader.readAsDataURL(photoInput.files[0]);
    }

    closeEdit();
    alert("Profile updated successfully!");
}

let watchId = null;

function shareLocation() {

    const btn = document.querySelector(".btn-location");

    if (watchId === null) {

        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }

        watchId = navigator.geolocation.watchPosition(function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            console.log("Location:", lat, lng);

        });

        btn.innerText = "🛑 Stop Sharing Location";
        btn.style.background = "red";

    } else {

        navigator.geolocation.clearWatch(watchId);
        watchId = null;

        btn.innerText = "📍 Share Location";
        btn.style.background = "";
    }
}

function deleteProfile() {
    document.getElementById("deletePopup").classList.add("show");
    document.getElementById("deletePopup").style.display = "flex";
}

function closeDeletePopup() {
    document.getElementById("deletePopup").classList.remove("show");
}

function confirmDelete() {

    const password = document.getElementById("deletePassword").value;

    if (!password) {
        alert("Enter your password");
        return;
    }

    if (password !== "driver@123") {
        alert("Incorrect password");
        return;
    }

    alert("Profile deleted. Redirecting to login...");
    window.location.href = "index.html";
}
