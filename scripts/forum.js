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
    
    if (lastSubmit && (now - lastSubmit < 10000)) {
        alert('Please wait before submitting again');
        return;
    }
    
    localStorage.setItem('lastSubmit', now);
    
    // Create mailto link
    const subject = `Contact Form: Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:ale@picone.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Optional: Reset form after sending
    contactForm.reset();
});
