// Initialize EmailJS with your public key
(function() {
    emailjs.init("pWoaGCK9XhxMENvBs"); 
  })();
  
  // Add event listener to the form
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Send form data using EmailJS
      emailjs.sendForm('service_bp6i7po', 'template_1z8laii', this)
        .then(() => {
          alert('Message sent successfully!');
        }, (error) => {
          console.error('Failed to send message...', error);
          alert('Failed to send message. Please try again later.');
        });
    });
  });
  