document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    logging();
});


function logging() {
    event.preventDefault();

    const loginUsername = document.getElementById("loginUsername").value.trim().toLowerCase();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    if (loginUsername === "admin" && loginPassword === "admin@123") {
        window.location.href = "admin-dashboard.html";
    }
    else if (loginUsername === "driver" && loginPassword === "driver@123") {
        window.location.href = "driver.html";
    }
    else if (loginUsername === "user" && loginPassword === "user@123") {
        window.location.href = "user-dashboard.html";
    }
    else {
        alert("Invalid username or password");
    }
}

function openRegister() {
    document.getElementById("registerModal").style.display = "flex";
}

function roleChange() {
    let role = document.getElementById("role").value;

    document.getElementById("adminFields").style.display = role === "ADMIN" ? "block":"none";

    document.getElementById("driverFields").style.display = role === "DRIVER" ? "block":"none";

}

function registerUser() {
    const role = document.getElementById("role").value;

const username = document.getElementById("regUsername").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("pass").value.trim();
const confirmPassword = document.getElementById("confirmPassword").value.trim();

// 🔹 Basic Empty Validation
if (!username || !email || !password || !confirmPassword || !role) {
    alert("All fields are required");
    return;
}

// 🔹 Email Format Validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    alert("Enter valid email address");
    return;
}

// 🔹 Password Length Validation
if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
}

// 🔹 Password Match Validation
if (password !== confirmPassword) {
    alert("Password Mismatch");
    return;
}

const data = {
    username,
    email,
    password,
    role
};

// 🔹 DRIVER Validation
if (role === "DRIVER") {

    const driverId = document.getElementById("driverId").value.trim();
    const driverName = document.getElementById("driverName").value.trim();
    const ambulanceNumber = document.getElementById("ambulanceNumber").value.trim();
    const contactNumber = document.getElementById("contactNumber").value.trim();

    if (!driverId || !driverName || !ambulanceNumber || !contactNumber) {
        alert("All driver fields are required");
        return;
    }

    // Contact number validation (10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(contactNumber)) {
        alert("Enter valid 10-digit contact number");
        return;
    }

    data.driverId = driverId;
    data.driverName = driverName;
    data.ambulanceNumber = ambulanceNumber;
    data.contactNumber = contactNumber;
}

// 🔹 ADMIN Validation
if (role === "ADMIN") {

    const hospitalCode = document.getElementById("hospitalCode").value.trim();

    if (!hospitalCode) {
        alert("Hospital Code is required");
        return;
    }

    data.hospitalCode = hospitalCode;
}
    const msg = document.getElementById("registerMsg");

    alert("Registration successfully completed. Now you have to Login!");
    clearRegisterForm();
    closeRegister();
    fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error("Registration failed");
        return res.text();
    })
    .then(responseText => {
        msg.style.color = "green";
        msg.innerText = "Registration successful!";

        setTimeout(() => {
            clearRegisterForm();
            closeRegister();
            msg.innerText = "";
        }, 1000);
    })
    .catch(err => {
        console.error(err);
        msg.style.color = "red";
        msg.innerText = "Registration failed";
    });
}


function closeRegister() {
   document.getElementById("registerModal").style.display = "none";
}


function openForgotPopup() {
    document.getElementById("forgotPopup").style.display = "flex";
}

function closeForgotPopup() {
    document.getElementById("forgotPopup").style.display = "none";
}

function sendOtp() {

    const email = document.getElementById("emailID").value;
    console.log("Email entered:", email);
    alert("OTP SENT");
    resetPassword();
    fetch("/api/users/forgot-password", {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email})
    })

    .then(res=> res.text())
    .then(()=> {
        document.getElementById("otpSection").style.display = "block";
        document.getElementById("submitBtn").style.display = "none";
    });

}

function resetPassword() {

    document.getElementById("otpSection").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";

    const email = document.getElementById("emailID").value;
    const otp = document.getElementById("otp").value;
    const pass= document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmNewPassword").value;

    console.log(email,otp, pass, confirm);

    if (!email || !otp || !pass || !confirm) {
    alert("All fields are required");
    return;
}

    if(pass.length < 8) {
        alert("Password must be at least 8 characters");
        return;
    }

    if(pass !== confirm) {
        alert("Password mismatch");
        return;
    }
    alert("Password reset Successfully.");
    clearRegisterForm();
    window.location.href = "login.html";
    
    fetch("/api/users/reset-password", {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            email,
            otp,
            newPassword : pass
        })
    })
    .then(res => res.text())
    .then(() => {
        alert("Password reset successful!");
        window.location.href="/login";
    });
}


function clearRegisterForm() {
    document.getElementById("regUsername").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("role").value = "";

    // Admin fields
    if (document.getElementById("hospitalCode"))
        document.getElementById("hospitalCode").value = "";

    // Driver fields
    if (document.getElementById("driverId"))
        document.getElementById("driverId").value = "";
    if (document.getElementById("driverName"))
        document.getElementById("driverName").value = "";
    if (document.getElementById("ambulanceNumber"))
        document.getElementById("ambulanceNumber").value = "";
    if (document.getElementById("contact"))
        document.getElementById("contact").value = "";

    // Hide role sections
    document.getElementById("adminFields").style.display = "none";
    document.getElementById("driverFields").style.display = "none";
}


