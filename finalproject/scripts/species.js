// species.js - Wildlife species listing with filtering and modal

import wildlifeData from '../data/wildlife.mjs';

// DOM Elements
const speciesGrid = document.querySelector('#species-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.querySelector('#species-modal');
const modalBody = document.querySelector('#modal-body');
const closeModalBtn = document.querySelector('.close-modal');

let currentFilter = 'all';

// Display species with filter
function displaySpecies(filter = 'all') {
    if (!speciesGrid) return;

    let filtered = [...wildlifeData];

    if (filter === 'mammal') {
        filtered = wildlifeData.filter(s => s.category === 'mammal');
    } else if (filter === 'endangered') {
        filtered = wildlifeData.filter(s => s.conservationStatus === 'endangered');
    } else if (filter === 'vulnerable') {
        filtered = wildlifeData.filter(s => s.conservationStatus === 'vulnerable');
    }

    speciesGrid.innerHTML = '';

    filtered.forEach(species => {
        const card = document.createElement('div');
        card.className = 'species-card';

        const statusBadge = species.conservationStatus.replace('-', ' ');

        card.innerHTML = `
            <img src="images/${species.image}" alt="${species.name}" loading="lazy" width="300" height="200">
            <div class="species-card-content">
                <h3>${species.name}</h3>
                <p><em>${species.scientificName}</em></p>
                <span class="status-badge ${species.conservationStatus}">${statusBadge}</span>
                <p class="population">Population: ${species.population.toLocaleString()}</p>
                <button class="species-detail-btn" data-id="${species.id}">View Details</button>
            </div>
        `;
        speciesGrid.appendChild(card);
    });

    // Add event listeners to detail buttons
    document.querySelectorAll('.species-detail-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openModal(id);
        });
    });
}

// Open modal with species details
function openModal(id) {
    const species = wildlifeData.find(s => s.id === id);
    if (!species || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <h2>${species.name}</h2>
        <p><strong>Scientific Name:</strong> ${species.scientificName}</p>
        <p><strong>Conservation Status:</strong> ${species.conservationStatus.replace('-', ' ')}</p>
        <p><strong>Population:</strong> ${species.population.toLocaleString()}</p>
        <p><strong>Habitat:</strong> ${species.habitat}</p>
        <p><strong>Lifespan:</strong> ${species.lifespan} years</p>
        <p><strong>Description:</strong> ${species.description}</p>
        <p><strong>Threats:</strong> ${species.threats.join(', ')}</p>
        <img src="images/${species.image}" alt="${species.name}" loading="lazy">
    `;

    modal.showModal();
}

// Modal event listeners
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (modal) modal.close();
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

// Filter button event listeners
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.getAttribute('data-filter');
        displaySpecies(currentFilter);
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displaySpecies('all');
});