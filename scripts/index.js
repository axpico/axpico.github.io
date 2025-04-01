document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu visibility
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent document click from immediately closing the menu
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate header height to offset scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');

    function setActiveNavLink() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Set active link on page load
    setActiveNavLink();

    // Update active link on scroll
    window.addEventListener('scroll', setActiveNavLink);
});
