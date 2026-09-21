// chamber-date.js - Dynamic footer dates

document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    const currentYearElement = document.querySelector('#currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.querySelector('#lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
    }
});