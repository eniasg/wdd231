// Dynamic date functionality for footer

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