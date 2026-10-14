// navigation.js - Hamburger menu toggle (shared across all pages)

document.addEventListener('DOMContentLoaded', () => {
    const navButton = document.querySelector('#nav-button');
    const navBar = document.querySelector('#nav-bar');
    if (navButton && navBar) {
        navButton.addEventListener('click', () => {
            navButton.classList.toggle('show');
            navBar.classList.toggle('show');
        });
    }
});
