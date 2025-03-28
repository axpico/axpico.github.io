document.addEventListener('DOMContentLoaded', (event) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    // Osserva le sezioni
    document.querySelectorAll('.about-section, .skills-section, .Programming_Languages-section, .contact-section').forEach(section => {
        observer.observe(section);
    });

    // Osserva le righe della tabella
    document.querySelectorAll('.csv-table tr').forEach(row => {
        observer.observe(row);
    });
});
