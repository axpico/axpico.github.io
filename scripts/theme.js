document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStylesheet = document.getElementById('theme-stylesheet');

    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        themeStylesheet.setAttribute('href', 'styles/latte_index.css'); 
        themeToggle.textContent = '🌙'; 
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function () {
        if (themeStylesheet.getAttribute('href') === 'styles/macchiato_index.css') {
            // Switch to light theme
            themeStylesheet.setAttribute('href', 'styles/latte_index.css');
            themeToggle.textContent = '🌙'; 
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark theme
            themeStylesheet.setAttribute('href', 'styles/macchiato_index.css');
            themeToggle.textContent = '🌞'; 
            localStorage.setItem('theme', 'dark');
        }
    });
});
