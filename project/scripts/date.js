// date.js - Dynamic footer year and last modified date

document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.querySelector('#currentyear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const modEl = document.querySelector('#lastModified');
    if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
});