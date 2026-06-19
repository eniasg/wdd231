// main.js - Home page functionality

import wildlifeData from '../data/wildlife.mjs';

// DOM Elements
const featuredGrid = document.querySelector('#featured-grid');
const statNumbers = document.querySelectorAll('.stat-number');

// Dynamic stats with animation
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = Math.ceil(target / 40);

        function updateStat() {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                return;
            }
            stat.textContent = current.toLocaleString();
            requestAnimationFrame(updateStat);
        }
        updateStat();
    });
}

// Display featured species (4 random)
function displayFeaturedSpecies() {
    if (!featuredGrid) return;

    // Get 4 random species
    const shuffled = [...wildlifeData];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const featured = shuffled.slice(0, 4);

    featuredGrid.innerHTML = '';
    featured.forEach(species => {
        const card = document.createElement('div');
        card.className = 'featured-card';

        const statusBadge = species.conservationStatus.replace('-', ' ');

        card.innerHTML = `
            <img src="images/${species.image}" alt="${species.name}" loading="lazy" width="300" height="200">
            <div class="featured-card-content">
                <h3>${species.name}</h3>
                <p><em>${species.scientificName}</em></p>
                <span class="status-badge ${species.conservationStatus}">${statusBadge}</span>
                <p class="population">Population: ${species.population.toLocaleString()}</p>
                <a href="species.html" class="learn-link">Learn More →</a>
            </div>
        `;
        featuredGrid.appendChild(card);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedSpecies();
    setTimeout(animateStats, 300);
});