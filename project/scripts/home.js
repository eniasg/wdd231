// home.js - Home page: animated stats + featured species (random selection)

import wildlifeData from '../data/wildlife.mjs';

// =====================================================
// 1. Animated number counters
// =====================================================
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.ceil(target / 40);

        function tick() {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                return;
            }
            el.textContent = current.toLocaleString();
            requestAnimationFrame(tick);
        }
        tick();
    });
}

// =====================================================
// 2. Featured species — 4 random items using filter + forEach
// =====================================================
function displayFeatured() {
    const grid = document.querySelector('#featured-grid');
    if (!grid) return;

    // Shuffle using Array.sort with random comparator (array method)
    const shuffled = [...wildlifeData].sort(() => Math.random() - 0.5);
    const featured = shuffled.slice(0, 4);

    grid.innerHTML = '';

    featured.forEach(species => {
        const card = document.createElement('article');
        card.className = 'featured-card';
        card.innerHTML = `
            <img src="images/${species.image}" alt="${species.name}" width="300" height="200" loading="lazy">
            <div class="featured-card-content">
                <h3>${species.name}</h3>
                <p><em>${species.scientificName}</em></p>
                <span class="status-badge ${species.conservationStatus.toLowerCase().replace(' ', '-')}">
                    ${species.conservationStatus}
                </span>
                <p class="population">Population: ${species.population.toLocaleString()}</p>
            </div>
        `;
        grid.appendChild(card);
    });
}

// =====================================================
// 3. Init
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    displayFeatured();
    setTimeout(animateStats, 300);
});