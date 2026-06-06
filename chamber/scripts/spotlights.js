// spotlights.js - Fetch and display random gold/silver member spotlights

const membersUrl = './data/members.json';
const spotlightsContainer = document.querySelector('#spotlights-container');

// Fetch member data
async function getMemberData() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Members data:', data);

        // Filter gold (level 3) and silver (level 2) members
        const goldSilverMembers = data.members.filter(member =>
            member.membershipLevel === 3 || member.membershipLevel === 2
        );

        console.log('Gold/Silver members:', goldSilverMembers);

        // Randomly select 2-3 members
        const spotlightsCount = Math.min(3, goldSilverMembers.length);
        const randomSpotlights = getRandomMembers(goldSilverMembers, spotlightsCount);

        displaySpotlights(randomSpotlights);

    } catch (error) {
        console.error('Error fetching member data:', error);
        if (spotlightsContainer) {
            spotlightsContainer.innerHTML = '<p class="error">Unable to load member spotlights. Please try again later.</p>';
        }
    }
}

// Get random members from array
function getRandomMembers(array, count) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}

// Display spotlights
function displaySpotlights(members) {
    if (!spotlightsContainer) return;

    spotlightsContainer.innerHTML = '';

    members.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.className = 'spotlight-card';

        // Determine membership level display
        let levelText = '';
        let levelClass = '';
        switch (member.membershipLevel) {
            case 3:
                levelText = 'Gold Member';
                levelClass = 'gold';
                break;
            case 2:
                levelText = 'Silver Member';
                levelClass = 'silver';
                break;
            default:
                levelText = 'Member';
                levelClass = 'member';
        }

        // Handle missing image
        const imagePath = member.image ? `images/${member.image}` : 'images/placeholder-logo.svg';

        spotlightCard.innerHTML = `
            <div class="spotlight-logo">
                <img src="${imagePath}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder-logo.svg'">
            </div>
            <div class="spotlight-content">
                <h3>${member.name}</h3>
                <p class="tagline">${member.tagline || ''}</p>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="website">🌐 <a href="${member.website}" target="_blank">Visit Website</a></p>
                <p class="membership-level ${levelClass}">🏆 ${levelText}</p>
            </div>
        `;

        spotlightsContainer.appendChild(spotlightCard);
    });
}

// Initialize spotlights
document.addEventListener('DOMContentLoaded', getMemberData);