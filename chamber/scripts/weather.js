// weather.js - Fetch and display weather for Aspindale, Zimbabwe

// Aspindale coordinates (approximate for Harare area)
const lat = -17.83;
const lon = 31.05;

// OpenWeatherMap API key
const apiKey = 'f5519bd4c3e70fc3e4b496cf252ae5bf';

// API URLs
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// DOM elements
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const forecastContainer = document.querySelector('#forecast-container');

// ---- Current weather ----
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Current weather error:', error);
        if (currentTemp) currentTemp.textContent = '—';
        if (weatherDesc) weatherDesc.textContent = 'Unavailable';
    }
}

function displayCurrentWeather(data) {
    if (currentTemp) currentTemp.textContent = `${Math.round(data.main.temp)}°F`;

    const weather = data.weather[0];
    if (weatherDesc) {
        const desc = weather.description;
        weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    }
    if (weatherIcon) {
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weather.icon}@2x.png`);
        weatherIcon.setAttribute('alt', weather.description);
    }
}

// ---- 3-Day Forecast ----
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Forecast error:', error);
        if (forecastContainer) forecastContainer.innerHTML = '<p>Forecast unavailable.</p>';
    }
}

function displayForecast(data) {
    if (!forecastContainer) return;

    // Pick one forecast per day (around noon)
    const dailyMap = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours();

        // Target forecast around 11am–2pm
        if (hour >= 11 && hour <= 14 && !dailyMap[dayName]) {
            dailyMap[dayName] = {
                day: dayName,
                temp: Math.round(item.main.temp),
                desc: item.weather[0].description,
                icon: item.weather[0].icon
            };
        }
    });

    // If noon filtering fails, fall back to first 3 unique days
    let days = Object.values(dailyMap).slice(0, 3);
    if (days.length < 3) {
        days = [];
        const seen = new Set();
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            if (!seen.has(dayName) && days.length < 3) {
                seen.add(dayName);
                days.push({
                    day: dayName,
                    temp: Math.round(item.main.temp),
                    desc: item.weather[0].description,
                    icon: item.weather[0].icon
                });
            }
        });
    }

    forecastContainer.innerHTML = '';
    days.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <p class="forecast-day">${day.day}</p>
            <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="${day.desc}" width="50" height="50">
            <p class="forecast-temp">${day.temp}°F</p>
            <p class="forecast-desc">${day.desc}</p>
        `;
        forecastContainer.appendChild(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchForecast();
});