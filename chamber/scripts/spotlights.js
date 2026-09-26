// spotlights.js - Display random gold/silver member spotlights

const membersUrl = './data/members.json';
const spotlightsContainer = document.querySelector('#spotlights-container');

async function loadSpotlights() {
    if (!spotlightsContainer) return;

    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        // Filter to gold (3) or silver (2)
        const eligible = data.members.filter(m =>
            m.membershipLevel === 3 || m.membershipLevel === 2
        );

        // Shuffle and pick 3
        const shuffled = [...eligible].sort(() => Math.random() - 0.5);
        const chosen = shuffled.slice(0, 3);

        displaySpotlights(chosen);
    } catch (error) {
        console.error('Spotlights error:', error);
        spotlightsContainer.innerHTML = '<p>Unable to load spotlights.</p>';
    }
}

function displaySpotlights(members) {
    spotlightsContainer.innerHTML = '';

    members.forEach(member => {
        let badgeText, badgeClass;
        if (member.membershipLevel === 3) {
            badgeText = 'Gold Member';
            badgeClass = 'gold';
        } else {
            badgeText = 'Silver Member';
            badgeClass = 'silver';
        }

        const card = document.createElement('article');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" onerror="this.src='images/chamber-logo.svg'">
            <h3>${member.name}</h3>
            <p class="address">📍 ${member.address}</p>
            <p class="phone">📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank" class="website">🌐 Visit Website</a>
            <span class="badge ${badgeClass}">${badgeText}</span>
        `;
        spotlightsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadSpotlights);