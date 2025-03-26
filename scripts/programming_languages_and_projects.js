const contentSets = [
    {
        name: "Java",
        image: "images/logos/programming languages/java.svg",
        text: "Java is a class-based, object-oriented programming language designed for portability and cross-platform development.",
        projects: [
            {
                name: "Library Management System",
                image: "images/projects/java_library.jpg",
                description: "A comprehensive system to manage books, borrowers, and lending operations with user authentication and reporting features.",
                githubLink: "https://github.com/yourusername/java-library-management"
            },
            {
                name: "Hospital Management System",
                image: "images/projects/java_hospital.jpg",
                description: "An advanced system that manages patient records, doctor schedules, appointments, billing, and medical histories with reporting capabilities.",
                githubLink: "https://github.com/yourusername/java-hospital-management"
            }
        ]
    },
    {
        name: "Python",
        image: "images/logos/programming languages/python.svg",
        text: "Python is an interpreted, high-level, general-purpose programming language known for its readability and versatility.",
        projects: [
            {
                name: "Image Classifier",
                image: "images/projects/python_ml.jpg",
                description: "A simple machine learning project that can distinguish between real photos and AI-generated images using TensorFlow.",
                githubLink: "https://github.com/yourusername/python-image-classifier"
            },
            {
                name: "Weather App",
                image: "images/projects/python_weather.png",
                description: "A simple application that fetches and displays current weather data using a free API.",
                githubLink: "https://github.com/axpico/python-weather-app.git"
            }
        ]
    },
    {
        name: "Rust",
        image: "images/logos/programming languages/rust.svg",
        text: "Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.",
        projects: [
            {
                name: "Simple File Explorer",
                image: "images/projects/rust_explorer.jpg",
                description: "A command-line file explorer that allows users to navigate directories, view files, and perform basic file operations.",
                githubLink: "https://github.com/yourusername/rust-file-explorer"
            },
            {
                name: "File Organizer",
                image: "images/projects/rust_files.jpg",
                description: "A simple utility that organizes files in a directory based on their types or creation dates.",
                githubLink: "https://github.com/yourusername/rust-file-organizer"
            }
        ]
    },
    {
        name: "Ruby",
        image: "images/logos/programming languages/ruby.svg",
        text: "Ruby is a dynamic, object-oriented programming language focused on simplicity and productivity with an elegant syntax that is natural to read and easy to write.",
        projects: [
            {
                name: "Personal Finance Tracker",
                image: "images/projects/ruby_finance.jpg",
                description: "An application that helps users track income, expenses, and budgets with data visualization for financial summaries.",
                githubLink: "https://github.com/yourusername/ruby-finance-tracker"
            },
            {
                name: "Recipe Sharing Platform",
                image: "images/projects/ruby_recipe.jpg",
                description: "A web application where users can share recipes, rate others' contributions, and organize their favorite culinary creations.",
                githubLink: "https://github.com/yourusername/ruby-recipe-platform"
            }
        ]
    },
    {
        name: "JavaScript",
        image: "images/logos/programming languages/javascript.svg",
        text: "JavaScript is a versatile scripting language that enables interactive web content, supporting both frontend and backend development.",
        projects: [
            {
                name: "Personal Portfolio Website",
                image: "images/projects/js_portfolio.jpg",
                description: "A responsive personal website to showcase your skills and projects using HTML, CSS, and JavaScript.",
                githubLink: "https://github.com/yourusername/js-portfolio"
            },
            {
                name: "Memory Card Game",
                image: "images/projects/js_memory.jpg",
                description: "An interactive memory card matching game with animations and score tracking.",
                githubLink: "https://github.com/yourusername/js-memory-game"
            }
        ]
    }
];

// Initialize the current index
let currentIndex = 0;

// Elements cache for better performance
let elements = {};

/**
 * Initialize the elements cache
 */
function cacheElements() {
    elements = {
        leftBox: document.getElementById('left-box'),
        rightBox: document.getElementById('right-box'),
        name: document.getElementById('name'),
        image: document.getElementById('image'),
        text: document.getElementById('text'),
        prevArrow: document.getElementById('prev-arrow'),
        nextArrow: document.getElementById('next-arrow'),
        projectContainer: document.getElementById('project-container')
    };
}

/**
 * Updates the carousel content based on the current index
 */
function updateContent() {
    // Calculate indices for left, middle, and right content
    const leftIndex = (currentIndex - 1 + contentSets.length) % contentSets.length;
    const middleIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % contentSets.length;

    // Clear previous content
    elements.leftBox.innerHTML = '';
    elements.rightBox.innerHTML = '';

    // Update left box
    const leftImg = document.createElement('img');
    leftImg.src = contentSets[leftIndex].image;
    leftImg.alt = contentSets[leftIndex].name;
    leftImg.style.maxWidth = '100%';
    leftImg.style.height = 'auto';
    elements.leftBox.appendChild(leftImg);

    // Update middle content
    const middleContent = contentSets[middleIndex];
    elements.name.textContent = middleContent.name;
    elements.image.src = middleContent.image;
    elements.image.alt = middleContent.name;
    elements.text.textContent = middleContent.text;

    // Update right box
    const rightImg = document.createElement('img');
    rightImg.src = contentSets[rightIndex].image;
    rightImg.alt = contentSets[rightIndex].name;
    rightImg.style.maxWidth = '100%';
    rightImg.style.height = 'auto';
    elements.rightBox.appendChild(rightImg);

    // Update projects
    updateProjects(middleIndex);
}

/**
 * Updates the projects displayed based on the selected programming language
 * @param {number} languageIndex - The index of the selected programming language
 */
function updateProjects(languageIndex) {
    // Clear previous projects
    elements.projectContainer.innerHTML = '';
    
    // Get projects for the current language
    const projects = contentSets[languageIndex].projects;
    
    // Create and append project elements
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        
        projectElement.innerHTML = `
            <h3>${project.name}</h3>
            <div class="project-image">
                <img class="project_image" src="${project.image}" alt="${project.name}">
            </div>
            <p>${project.description}</p>
            <a href="${project.githubLink}" class="github-link" target="_blank" rel="noopener noreferrer">
                View on GitHub <img class="github-icon" src="images/logos/social icons/github.svg">
            </a>
        `;
        
        elements.projectContainer.appendChild(projectElement);
    });
}

/**
 * Navigate to the previous slide
 */
function goToPrevSlide() {
    currentIndex = (currentIndex - 1 + contentSets.length) % contentSets.length;
    updateContent();
}

/**
 * Navigate to the next slide
 */
function goToNextSlide() {
    currentIndex = (currentIndex + 1) % contentSets.length;
    updateContent();
}

/**
 * Initialize the carousel and event listeners
 */
function initCarousel() {
    cacheElements();
    updateContent();
    
    // Add event listeners for navigation
    elements.prevArrow.addEventListener('click', goToPrevSlide);
    elements.nextArrow.addEventListener('click', goToNextSlide);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (event.key === 'ArrowRight') {
            goToNextSlide();
        }
    });
}

// Initialize the carousel when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent document click from immediately closing the menu
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height to offset scroll position
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
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
            const sectionTop = section.offsetTop - headerHeight - 20; // 20px offset for better UX
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
    
    // Initialize the carousel
    initCarousel();
});
