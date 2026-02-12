let driverCount = 3; // existing sample rows

function openModal() {
    document.getElementById("driverModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("driverModal").style.display = "none";
}

function saveDriver() {

    const name = document.getElementById("dName").value.trim();
    const ambulanceNo = document.getElementById("dAmbulanceNo").value.trim();
    const ambulanceId = document.getElementById("dAmbulanceId").value.trim();
    const contact = document.getElementById("dContact").value.trim();
    const status = document.getElementById("dStatus").value;

    if (!name || !ambulanceNo || !ambulanceId || !contact || !status) {
        alert("All fields required!");
        return;
    }

    driverCount++;

    const table = document.getElementById("driverBody");
    const row = table.insertRow();
    row.classList.add("new-row");


    row.innerHTML = `
        <td>${driverCount}</td>
        <td>${name}</td>
        <td>${ambulanceNo}</td>
        <td>${ambulanceId}</td>
        <td>${contact}</td>
        <td>${status}</td>
        <td>-</td>
    `;

    closeModal();

    // clear fields
    document.getElementById("dName").value = "";
    document.getElementById("dAmbulanceNo").value = "";
    document.getElementById("dAmbulanceId").value = "";
    document.getElementById("dContact").value = "";
    document.getElementById("dStatus").value = "";
}


function filterDrivers() {

    const filter = document.getElementById("statusFilter").value;
    const rows = document.querySelectorAll("#driverBody tr");
    let count = 0;

    rows.forEach(row => {

        const status = row.cells[5].innerText.toLowerCase();

        if (filter === "" || filter === "total") {
            row.style.display = "";
            count++;
        }
        else if (filter === "duty" && status === "on duty") {
            row.style.display = "";
            count++;
        }
        else if (filter === "available" && status === "available") {
            row.style.display = "";
            count++;
        }
        else if (filter === "busy" && status === "busy") {
            row.style.display = "";
            count++;
        }
        else {
            row.style.display = "none";
        }

    });

    document.getElementById("status-count").innerText = `Count: ${count}`;
}

function openModal() {
    const modal = document.getElementById("driverModal");
    modal.classList.add("show");
}

function closeModal() {
    const modal = document.getElementById("driverModal");
    modal.classList.remove("show");
}
