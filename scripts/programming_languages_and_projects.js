const contentSets = [
    {
        name: "Java",
        image: "images/logos/programming languages/java.svg",
        text: "Java is a class-based, object-oriented programming language designed for portability and cross-platform development.",
        projects: [
            {
                name: "Library Management System",
                image: "images/projects/java_library.png",
                description: "A comprehensive system to manage books, borrowers, and lending operations with user authentication and reporting features.",
                githubLink: "https://github.com/axpico/Library-Management-System.git"
            },
            {
                name: "Tic-Tac-Toe game",
                image: "images/projects/java-tictactoe-game.png",
                description: "A Classic Tic-Tac-Toe game with a graphical user interface build using java Swing. Feature include a two-player mode and an AI opponent with multiple difficulty levels.",
                githubLink: "https://github.com/axpico/java-tictactoe-game.git"
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
                image: "images/projects/python_ml.png",
                description: "A simple machine learning project that can distinguish between real photos and AI-generated images using PyTorch.",
                githubLink: "https://github.com/axpico/image-classifier-ai-and-not.git"
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
                image: "images/projects/rust_explorer.png",
                description: "A command-line file explorer that allows users to navigate directories, view files, and perform basic file operations.",
                githubLink: "https://github.com/axpico/rust-file-explorer.git"
            },
            {
                name: "File Organizer",
                image: "images/projects/rust_files.png",
                description: "A simple utility that organizes files in a directory based on their types or creation dates.",
                githubLink: "https://github.com/axpico/file-organizer.git"
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
                description: "A responsive personal website to showcase my skills and projects using HTML, CSS, and JavaScript.",
                githubLink: "https://github.com/axpico/axpico.github.io.git"
            },
            {
                name: "<a href=\"Memory-Card-Game/index.html\">Memory Card Game</a>",
                image: "images/projects/js_memory.png",
                description: "An interactive memory card matching game with animations and score tracking.",
                githubLink: "https://github.com/axpico/Memory-Card-Game.git"
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
        topBox: document.getElementById('top-box'),
        bottomBox: document.getElementById('bottom-box'),
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
    const topIndex = (currentIndex - 1 + contentSets.length) % contentSets.length;
    const middleIndex = currentIndex;
    const bottomIndex = (currentIndex + 1) % contentSets.length;

    elements.topBox.innerHTML = '';
    elements.bottomBox.innerHTML = '';

    const topImg = document.createElement('img');
    topImg.src = contentSets[topIndex].image;
    topImg.alt = contentSets[topIndex].name;
    topImg.style.maxWidth = '100%';
    topImg.style.height = 'auto';
    elements.topBox.appendChild(topImg);

    const middleContent = contentSets[middleIndex];
    elements.name.textContent = middleContent.name;
    elements.image.src = middleContent.image;
    elements.image.alt = middleContent.name;
    elements.text.textContent = middleContent.text;

    const bottomImg = document.createElement('img');
    bottomImg.src = contentSets[bottomIndex].image;
    bottomImg.alt = contentSets[bottomIndex].name;
    bottomImg.style.maxWidth = '100%';
    bottomImg.style.height = 'auto';
    elements.bottomBox.appendChild(bottomImg);

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
                <img class="github-icon" src="images/logos/social icons/github.svg"> View on GitHub
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
    // Initialize the carousel
    initCarousel();
});
