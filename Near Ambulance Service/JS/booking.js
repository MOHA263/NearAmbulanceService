document.getElementById("bookingForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const form = this;

    const inputs = form.querySelectorAll("input, select, textarea");

    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Please fill all required fields.");
            input.focus();
            return;
        }
    }

    // Age validation
    const age = form.querySelector('input[type="number"]').value;
    if (age <= 0 || age > 120) {
        alert("Enter valid age.");
        return;
    }

    // Phone validation (10 digits)
    const phone = form.querySelector('input[type="tel"]').value;
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Enter valid 10 digit phone number.");
        return;
    }

    // Date validation (not past date)
    const dateInput = form.querySelector('input[type="date"]').value;
    const today = new Date().toISOString().split("T")[0];

    if (dateInput < today) {
        alert("Booking date cannot be in the past.");
        return;
    }

    // ✅ If everything correct
    showSuccessPopup();

    form.reset();
});

function showSuccessPopup() {

    const popup = document.getElementById("successPopup");
    popup.style.display = "flex";

    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}
