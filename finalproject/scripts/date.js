// date.js - Dynamic footer dates

document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    const yearElement = document.querySelector('#currentyear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const modifiedElement = document.querySelector('#lastModified');
    if (modifiedElement) {
        modifiedElement.textContent = 'Last Modified: ' + document.lastModified;
    }
});