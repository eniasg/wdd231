// discover.js - Import interests, build cards, and handle localStorage visit tracking

import interests from '../data/interests.mjs';

const gridContainer = document.querySelector('#discover-grid');
const visitMessageDiv = document.querySelector('#visit-message');

/* ============================================================
   1. VISIT TRACKING (localStorage)
   ============================================================ */
function handleVisitTracking() {
    if (!visitMessageDiv) return;

    const lastVisitRaw = localStorage.getItem('discoverLastVisit');
    const currentVisit = Date.now();

    let message = '';

    if (!lastVisitRaw) {
        // First ever visit
        message = `
            <div class="visit-info first-visit">
                <span>🎉</span>
                <p>Welcome! Let us know if you have any questions.</p>
                <button class="close-message" aria-label="Dismiss message">&times;</button>
            </div>
        `;
    } else {
        const lastVisit = parseInt(lastVisitRaw, 10);
        const msDiff = currentVisit - lastVisit;
        const dayMs = 1000 * 60 * 60 * 24;

        if (msDiff < dayMs) {
            // Less than one day
            message = `
                <div class="visit-info recent-visit">
                    <span>👋</span>
                    <p>Back so soon! Awesome!</p>
                    <button class="close-message" aria-label="Dismiss message">&times;</button>
                </div>
            `;
        } else {
            const days = Math.floor(msDiff / dayMs);
            const dayWord = days === 1 ? 'day' : 'days';
            message = `
                <div class="visit-info days-visit">
                    <span>📅</span>
                    <p>You last visited ${days} ${dayWord} ago.</p>
                    <button class="close-message" aria-label="Dismiss message">&times;</button>
                </div>
            `;
        }
    }

    visitMessageDiv.innerHTML = message;

    // Wire up the close button
    const closeBtn = visitMessageDiv.querySelector('.close-message');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            visitMessageDiv.style.display = 'none';
        });
    }

    // Store the current visit time
    localStorage.setItem('discoverLastVisit', currentVisit);
}

/* ============================================================
   2. BUILD CARDS
   ============================================================ */
function buildCards() {
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    interests.forEach(item => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.setAttribute('data-id', item.id);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure class="card-figure">
                <img src="images/${item.image}"
                     alt="${item.name}"
                     width="300"
                     height="200"
                     loading="lazy">
            </figure>
            <address class="card-address">📍 ${item.address}</address>
            <p class="card-description">${item.description}</p>
            <button class="learn-more-btn" type="button" data-id="${item.id}">
                Learn More →
            </button>
        `;

        gridContainer.appendChild(card);
    });

    // Wire up Learn More buttons
    gridContainer.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'), 10);
            const item = interests.find(i => i.id === id);
            if (item) {
                alert(`More about ${item.name}\n\n📍 ${item.address}\n\n${item.description}`);
            }
        });
    });
}

/* ============================================================
   3. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    handleVisitTracking();
    buildCards();
});