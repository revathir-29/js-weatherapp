document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeatherData(city) {
    const apiKey = 'QC9YF34HPDMJUCWLRUDDY55JC';
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}&contentType=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        alert('Unable to retrieve weather data: ' + error.message);
    }
}

function displayWeatherData(data) {
    const cityName = data.resolvedAddress;
    const temperature = data.currentConditions.temp;
    const description = data.currentConditions.conditions;
    const humidity = data.currentConditions.humidity;
    const windSpeed = data.currentConditions.windspeed;

    document.querySelector('.city-name').textContent = cityName;
    document.querySelector('.temperature').textContent = `Temperature: ${temperature}°C`;
    document.querySelector('.weather-description').textContent = `Conditions: ${description}`;
    document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
    document.querySelector('.wind-speed').textContent = `Wind Speed: ${windSpeed} km/h`;

    document.querySelector('.weather-info').style.display = 'block';
}