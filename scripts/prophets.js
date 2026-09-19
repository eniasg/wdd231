// prophets.js - Fetch and display Latter-day Prophets data

// URL of the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Select the HTML div element with id "cards"
const cards = document.querySelector('#cards');

// Async function to fetch prophet data
async function getProphetData() {
    try {
        // Fetch the data
        const response = await fetch(url);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Convert response to JSON
        const data = await response.json();

        // Check the data response in console (temporary test)
        console.table(data.prophets);

        // Display the prophets
        displayProphets(data.prophets);

    } catch (error) {
        console.error('Error fetching prophet data:', error);
        cards.innerHTML = '<p>Error loading prophets data. Please try again later.</p>';
    }
}

// Function expression to display prophets (arrow function)
const displayProphets = (prophets) => {
    // Clear any existing content
    cards.innerHTML = '';

    // Use forEach loop to process each prophet record
    prophets.forEach((prophet) => {
        // Create a section element for the card
        const card = document.createElement('section');

        // Create an h2 element for the full name
        const fullName = document.createElement('h2');
        // Build full name using template string
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Create paragraph for birth date
        const birthDate = document.createElement('p');
        birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;

        // Create paragraph for birth place
        const birthPlace = document.createElement('p');
        birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

        // Calculate age at death or current age
        let age;
        if (prophet.death) {
            const birthYear = parseInt(prophet.birthdate.split(' ')[2]);
            const deathYear = parseInt(prophet.death.split(' ')[2]);
            age = deathYear - birthYear;
        } else {
            const birthYear = parseInt(prophet.birthdate.split(' ')[2]);
            const currentYear = new Date().getFullYear();
            age = currentYear - birthYear;
        }

        const ageInfo = document.createElement('p');
        ageInfo.innerHTML = `<strong>Age at Death:</strong> ${age} years`;

        // Create img element for portrait
        const portrait = document.createElement('img');
        // Set attributes using setAttribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '200');
        portrait.setAttribute('height', '250');

        // Append elements to the card
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(ageInfo);
        card.appendChild(portrait);

        // Append the card to the cards div
        cards.appendChild(card);
    });
};

// Invoke the function to fetch and display prophets
getProphetData();