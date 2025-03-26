// Define the content for programming languages and their projects
const contentSets = [
    {
        name: "Java",
        image: "images/logos/programming languages/java.svg",
        text: "Java is a class-based, object-oriented programming language designed for portability and cross-platform development.",
        projects: [
            {
                name: "Java Project 1",
                image: "images/projects/java_project1.jpg",
                description: "An Android application that helps users track their daily activities and habits.",
                githubLink: "https://github.com/yourusername/java-project1"
            },
            {
                name: "Java Project 2",
                image: "images/projects/java_project2.jpg",
                description: "A Spring Boot REST API for managing a digital library system.",
                githubLink: "https://github.com/yourusername/java-project2"
            }
        ]
    },
    {
        name: "Python",
        image: "images/logos/programming languages/python.svg",
        text: "Python is an interpreted, high-level, general-purpose programming language known for its readability and versatility.",
        projects: [
            {
                name: "Python Project 1",
                image: "images/projects/python_project1.jpg",
                description: "A machine learning model that predicts stock market trends using historical data.",
                githubLink: "https://github.com/yourusername/python-project1"
            },
            {
                name: "Python Project 2",
                image: "images/projects/python_project2.jpg",
                description: "A Django web application for managing personal finances and budgeting.",
                githubLink: "https://github.com/yourusername/python-project2"
            }
        ]
    },
    {
        name: "Rust",
        image: "images/logos/programming languages/rust.svg",
        text: "Rust is a systems programming language that runs blazingly fast, prevents segfaults, and guarantees thread safety.",
        projects: [
            {
                name: "Rust Project 1",
                image: "images/projects/rust_project1.jpg",
                description: "A command-line tool built with Rust that efficiently processes large data files.",
                githubLink: "https://github.com/yourusername/rust-project1"
            },
            {
                name: "Rust Project 2",
                image: "images/projects/rust_project2.jpg",
                description: "A high-performance web server implemented in Rust using async I/O.",
                githubLink: "https://github.com/yourusername/rust-project2"
            }
        ]
    },
    {
        name: "Ruby",
        image: "images/logos/programming languages/ruby.svg",
        text: "Ruby is a dynamic, object-oriented programming language focused on simplicity and productivity with an elegant syntax that is natural to read and easy to write.",
        projects: [
            {
                name: "Ruby Project 1",
                image: "images/projects/ruby_project1.jpg",
                description: "A Ruby on Rails web application for content management with user authentication and authorization.",
                githubLink: "https://github.com/yourusername/ruby-project1"
            },
            {
                name: "Ruby Project 2",
                image: "images/projects/ruby_project2.jpg",
                description: "A command-line utility built with Ruby that automates repetitive development tasks.",
                githubLink: "https://github.com/yourusername/ruby-project2"
            }
        ]
    },
    {
        name: "JavaScript",
        image: "images/logos/programming languages/javascript.svg",
        text: "JavaScript is a versatile scripting language that enables interactive web content, supporting both frontend and backend development.",
        projects: [
            {
                name: "JavaScript Project 1",
                image: "images/projects/javascript_project1.jpg",
                description: "An interactive web application built with modern JavaScript frameworks for real-time data visualization.",
                githubLink: "https://github.com/yourusername/javascript-project1"
            },
            {
                name: "JavaScript Project 2",
                image: "images/projects/javascript_project2.jpg",
                description: "A responsive single-page application using JavaScript and APIs to deliver dynamic content.",
                githubLink: "https://github.com/yourusername/javascript-project2"
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
                <img src="${project.image}" alt="${project.name}">
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
