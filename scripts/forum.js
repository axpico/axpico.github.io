// This script appears to be unused or conflicting with contact.js
// The contact form submission is handled by scripts/contact.js using EmailJS.
// If this script is not needed for other functionality, it can be removed.

/*
// Original mailto: logic (commented out or remove)
const contactForm = document.getElementById('contact-form'); // Assuming this is the intended form

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Anti-spam: Check submission time
        const now = new Date().getTime();
        const lastSubmit = localStorage.getItem('lastSubmit');

        if (lastSubmit && (now - lastSubmit < 10000)) { // 10 second cooldown
            alert('Please wait before submitting again');
            return;
        }

        localStorage.setItem('lastSubmit', now);

        // Create mailto link
        const subject = `Contact Form: Message from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:ale@picone.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Attempt to open email client
        window.location.href = mailtoLink;

        // Optional: Reset form after attempting to send
        // Note: Resetting might happen before the user actually sends the email via their client
        // contactForm.reset();
    });
} else {
    console.warn("Contact form not found for forum.js mailto handler.");
}
*/
