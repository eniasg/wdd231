// Directory page JavaScript - Fetch and display members with grid/list toggle

const url = './data/members.json';
const cardsContainer = document.querySelector('#cards');

// Fetch member data using async/await
async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
        cardsContainer.innerHTML = '<p class="error">Error loading directory. Please try again later.</p>';
    }
}

// Display members as cards
function displayMembers(members) {
    cardsContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'card';

        // Add membership level badge
        let levelBadge = '';
        switch (member.membershipLevel) {
            case 3:
                levelBadge = '<span class="badge gold">Gold</span>';
                break;
            case 2:
                levelBadge = '<span class="badge silver">Silver</span>';
                break;
            default:
                levelBadge = '<span class="badge member">Member</span>';
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" onerror="this.src='images/placeholder-logo.svg'">
            <div class="card-content">
                <h3>${member.name} ${levelBadge}</h3>
                <p class="tagline">${member.tagline}</p>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="email">✉️ ${member.email}</p>
                <a href="${member.website}" target="_blank" class="website">🌐 ${member.website}</a>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Display members as list view
function displayMembersAsList(members) {
    cardsContainer.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'directory-table';

    // Create table header
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Business Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Level</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    members.forEach(member => {
        const row = document.createElement('tr');

        let levelText = '';
        switch (member.membershipLevel) {
            case 3: levelText = 'Gold'; break;
            case 2: levelText = 'Silver'; break;
            default: levelText = 'Member';
        }

        row.innerHTML = `
            <td data-label="Business Name"><strong>${member.name}</strong><br><small>${member.tagline}</small></td>
            <td data-label="Address">${member.address}</td>
            <td data-label="Phone">${member.phone}</td>
            <td data-label="Website"><a href="${member.website}" target="_blank">Visit Site</a></td>
            <td data-label="Level"><span class="badge ${levelText.toLowerCase()}">${levelText}</span></td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    cardsContainer.appendChild(table);
}

// Toggle between grid and list views
function setupViewToggle() {
    const gridBtn = document.querySelector('#grid-view');
    const listBtn = document.querySelector('#list-view');

    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', async () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            cardsContainer.classList.remove('list-view');
            cardsContainer.classList.add('grid-view');

            const response = await fetch(url);
            const data = await response.json();
            displayMembers(data.members);
        });

        listBtn.addEventListener('click', async () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            cardsContainer.classList.remove('grid-view');
            cardsContainer.classList.add('list-view');

            const response = await fetch(url);
            const data = await response.json();
            displayMembersAsList(data.members);
        });
    }
}

// Initialize the page
getMemberData();
setupViewToggle();