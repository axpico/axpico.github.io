// contact.js - Handles form submission and email sending via EmailJS

// Initialize EmailJS with the public key
(function () {
  emailjs.init("pWoaGCK9XhxMENvBs");
})();

// Set up form submission event listener when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const email = form.email.value;
    const message = form.message.value;

    // Combine message and email for sending
    const combinedMessage = `Message: ${message}\n\nEmail: ${email}`;
    form.message.value = combinedMessage;

    // Send the form data using EmailJS
    emailjs
      .sendForm("service_bp6i7po", "template_1z8laii", form)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("Failed to send message...", error);
        alert("Failed to send message. Please try again later.");
      });

    // Restore original message value for better user experience
    setTimeout(() => {
      form.message.value = message;
    }, 1000);
  });
});
