const apiKey = 'e24c193100b24cdbb0995129240111'; // Your API key

// Function to fetch weather data
function fetchWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Populate the weather card with data
            document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
            document.getElementById('temperature').textContent = `${data.current.temp_c} °C`;
            document.getElementById('conditionIcon').src = data.current.condition.icon;
            document.getElementById('condition').querySelector('span').textContent = data.current.condition.text;
            document.getElementById('humidity').textContent = `${data.current.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.current.wind_kph} km/h`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert(`Error fetching weather data: ${error.message}`);
        });
}

// Fetch default weather data for Gurgaon on page load
fetchWeather('Gurgaon');

// Add event listener to the button
document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    fetchWeather(city);
});
s