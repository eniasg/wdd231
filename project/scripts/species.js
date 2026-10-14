// species.js - Species listing with filter + accessible modal

import wildlifeData from '../data/wildlife.mjs';

const speciesGrid = document.querySelector('#species-grid');
const modal = document.querySelector('#species-modal');
const modalBody = document.querySelector('#modal-body');
const closeBtn = document.querySelector('.modal-close');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// -----------------------------------------------------
// Display species cards
// -----------------------------------------------------
function displaySpecies(filter = 'all') {
    if (!speciesGrid) return;

    // filter() array method
    const filtered = filter === 'all'
        ? wildlifeData
        : wildlifeData.filter(s => s.conservationStatus === filter);

    speciesGrid.innerHTML = '';

    filtered.forEach(species => {
        const card = document.createElement('article');
        card.className = 'species-card';
        card.innerHTML = `
            <img src="images/${species.image}" alt="${species.name}" width="300" height="200" loading="lazy">
            <div class="species-card-content">
                <h3>${species.name}</h3>
                <p><em>${species.scientificName}</em></p>
                <span class="status-badge ${species.conservationStatus.toLowerCase().replace(' ', '-')}">
                    ${species.conservationStatus}
                </span>
                <p class="population">Population: ${species.population.toLocaleString()}</p>
                <button class="species-detail-btn" data-id="${species.id}" type="button">View Details</button>
            </div>
        `;
        speciesGrid.appendChild(card);
    });

    // Attach listeners to detail buttons
    speciesGrid.querySelectorAll('.species-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => openModal(parseInt(btn.dataset.id, 10)));
    });
}

// -----------------------------------------------------
// Open modal with species details
// -----------------------------------------------------
function openModal(id) {
    const species = wildlifeData.find(s => s.id === id);
    if (!species || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <h2>${species.name}</h2>
        <p><strong>Scientific Name:</strong> ${species.scientificName}</p>
        <p><strong>Category:</strong> ${species.category}</p>
        <p><strong>Conservation Status:</strong> ${species.conservationStatus}</p>
        <p><strong>Population:</strong> ${species.population.toLocaleString()}</p>
        <p><strong>Habitat:</strong> ${species.habitat}</p>
        <img src="images/${species.image}" alt="${species.name}" width="400" height="260" loading="lazy">
    `;
    modal.showModal();
}

// -----------------------------------------------------
// Modal close: X button + click outside
// -----------------------------------------------------
if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
}

if (modal) {
    modal.addEventListener('click', event => {
        const rect = modal.getBoundingClientRect();
        const inside =
            event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (!inside) modal.close();
    });
}

// -----------------------------------------------------
// Filter buttons
// -----------------------------------------------------
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        displaySpecies(currentFilter);
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => displaySpecies('all'));