const apiKey = '11b9ef54973ea81c2cb40ce110c1a9a9';

function getWeather(){
  
    const city = document.getElementById('city').value;

    if(!city){
      alert('please enter a city');
      return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetchWeatherData(currentWeatherUrl, displayWeather, 'current weather');
    fetchWeatherData(forecastUrl, data=>displayHourlyForecast(data.list) , 'hourly forecast');
}

function fetchWeatherData(url, callback, errorContext){
    fetch(url)
    .then(response => response.json())
    .then(data => callback(data))

    .catch(error => {
      console.error(`Error fetching ${errorContext} data:`, error);
      alert(`Error fetching ${errorContext} data. Please try again.`);
  });

}
    
    
function displayWeather(data){
    const tempInfoDiv = document.getElementById('temp');
    const weatherInfoDiv = document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const weatherIcon = document.getElementById('weather-icon');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempInfoDiv.innerHTML = '';

    if(data.cod == '404'){
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      const temperatureHTML = `<p>
        ${temperature}&deg;C
      </p>`;

      const weatherHTML = 
      `<p> ${cityName} </p>
      <p> ${description} </p>`;

      tempInfoDiv.innerHTML=temperatureHTML;
      weatherInfoDiv.innerHTML=weatherHTML;
      weatherIcon.src=iconUrl;
      weatherIcon.alt=description;

      showImage();

    }
}

function displayHourlyForecast(hourlyData){
      const hourlyForecastDiv = document.getElementById('hourly-forecast');
      const next24Hours = hourlyData.slice(0, 8);

      next24Hours.forEach(item => {
        
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
          <div class = "hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}&deg;C</span>
          </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;

      });
}

function showImage() {

        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';

}

function getLocation(){

    const storedLat = localStorage.getItem('latitude');
    const storedLon = localStorage.getItem('longitude');

    if(storedLat && storedLon){
      const lat = storedLat;
      const lon = storedLon;
  
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
      fetchWeatherData(currentWeatherUrl, displayWeather, 'current weather');
      fetchWeatherData(forecastUrl, data => displayHourlyForecast(data.list), 'hourly forecast');
    } else {

      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          localStorage.setItem('latitude', lat);
          localStorage.setItem('longitude', lon);

          const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

          fetchWeatherData(currentWeatherUrl, displayWeather, 'current weather');
          fetchWeatherData(forecastUrl, data => displayHourlyForecast(data.list), 'hourly forecast');
      }, error => {
          console.error('Error getting geolocation:', error);
          alert('Error getting geolocation. Please try again.');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }
}
