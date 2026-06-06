// weather.js - Fetch and display current weather and 3-day forecast

// Coordinates for Aspindale, Zimbabwe
const lat = -17.78;  // Approximate latitude for Harare/Aspindale area
const lon = 31.05;   // Approximate longitude

// API key - REPLACE WITH YOUR ACTUAL OPENWEATHERMAP API KEY
const apiKey = 'YOUR_API_KEY_HERE';

// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const weatherDesc = document.querySelector('#weather-desc');
const weatherIcon = document.querySelector('#weather-icon');
const forecastContainer = document.querySelector('#forecast-container');

// Current Weather URL
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// 5 Day / 3 Hour Forecast URL (we'll filter to get 3 days)
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Fetch current weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Current weather:', data);
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather:', error);
        if (currentTemp) currentTemp.textContent = 'Weather unavailable';
        if (weatherDesc) weatherDesc.textContent = 'Please check back later';
    }
}

// Display current weather
function displayCurrentWeather(data) {
    if (currentTemp) {
        currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
    }

    if (weatherDesc) {
        const description = data.weather[0].description;
        weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    }

    if (weatherIcon) {
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', data.weather[0].description);
    }
}

// Fetch 5-day forecast (filter to get 3 days at noon)
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Forecast data:', data);
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        if (forecastContainer) {
            forecastContainer.innerHTML = '<p>Forecast unavailable</p>';
        }
    }
}

// Display 3-day forecast
function displayForecast(data) {
    if (!forecastContainer) return;

    // Filter forecasts to get one per day (around noon time)
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const hour = date.getHours();

        // Get forecast around noon (11am-2pm) for each day
        if (hour >= 11 && hour <= 14) {
            if (!dailyForecasts[day]) {
                dailyForecasts[day] = {
                    day: day,
                    temp: Math.round(item.main.temp),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                };
            }
        }
    });

    // Convert to array and take first 3 days
    const threeDayForecast = Object.values(dailyForecasts).slice(0, 3);

    if (threeDayForecast.length === 0) {
        // Fallback: take first 3 unique days from the list
        const days = [];
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            if (!days.find(d => d.day === day) && days.length < 3) {
                days.push({
                    day: day,
                    temp: Math.round(item.main.temp),
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                });
            }
        });
        threeDayForecast.length = 0;
        threeDayForecast.push(...days);
    }

    // Clear container
    forecastContainer.innerHTML = '';

    // Add each forecast day
    threeDayForecast.forEach(forecast => {
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.icon}.png`;

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <p class="forecast-day">${forecast.day}</p>
            <img src="${iconUrl}" alt="${forecast.description}" loading="lazy">
            <p class="forecast-temp">${forecast.temp}°F</p>
            <p class="forecast-desc">${forecast.description}</p>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

// Initialize weather data
function initWeather() {
    fetchCurrentWeather();
    fetchForecast();
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initWeather);