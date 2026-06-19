// navigation.js - Shared navigation functionality

document.addEventListener('DOMContentLoaded', function () {
    const navButton = document.querySelector('#nav-button');
    const navBar = document.querySelector('#nav-bar');

    if (navButton && navBar) {
        navButton.addEventListener('click', function () {
            navButton.classList.toggle('show');
            navBar.classList.toggle('show');
        });
    }
});