document.getElementById("feedbackform")
  .addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("fbName").value.trim();
    const email = document.getElementById("fbEmail").value.trim();
    const message = document.getElementById("fbMessage").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill all required details!");
        return;
    }

    alert("Feedback submitted successfully!\nThanks for your feedback 😊");

    // Reset form properly
    this.reset();
});
