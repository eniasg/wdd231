// weather-api.js - Fetch and display current weather for Trier, Germany

// ---------- Replace with your own API key ----------
const apiKey = 'f5519bd4c3e70fc3e4b496cf252ae5bf';

// Coordinates for Trier, Germany (2 decimal places)
const lat = 49.76;
const lon = 6.64;

// Build the API URL (Current Weather endpoint)
// Endpoint: /data/2.5/weather
// Params: lat, lon, units, appid — separated by &
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// ---------- Select DOM elements ----------
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// ---------- Async function to fetch data ----------
async function apiFetch() {
    try {
        const response = await fetch(url);

        // Check if response is OK
        if (response.ok) {
            const data = await response.json();
            console.log(data);          // Test output
            displayResults(data);        // Render to page
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        if (currentTemp) currentTemp.textContent = '—';
        if (captionDesc) captionDesc.textContent = 'Unable to load weather';
    }
}

// ---------- Render results to the page ----------
function displayResults(data) {
    // Current temperature (rounded to nearest degree)
    currentTemp.textContent = `${Math.round(data.main.temp)}°F`;

    // First weather event
    const weather = data.weather[0];

    // Description (capitalize first letter)
    const desc = weather.description;
    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);

    // Weather icon URL (use @2x for higher quality)
    const iconCode = weather.icon;  // e.g., "04d"
    const iconSrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
}

// ---------- Invoke ----------
apiFetch();