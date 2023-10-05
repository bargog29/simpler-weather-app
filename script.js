'use strict'

const apiKey = '845bf464b4c4e78f02e812d258dfa228';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=metric&q=';

const city = document.querySelector('.search input');
const btn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather--icon');

btn.addEventListener('click', () => {
    getWeather(city.value);
})

async function getWeather(city) {
    try{
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    const cityName = data.name;
    const cityTemp = data.main.temp;
    const cityFeelsLike = data.main.feels_like;
    const cityHumidity = data.main.humidity;
    const cityWindSpeed = data.wind.speed;

    document.querySelector('.city').innerHTML = 'City: ' + cityName;
    document.querySelector('.temp').innerHTML = Math.round(cityTemp) + 'ºC' + "<br />" + `Feels like: ${cityFeelsLike}ºC`;
    document.querySelector('.humidity').innerHTML = cityHumidity + '%';
    document.querySelector('.wind').innerHTML = cityWindSpeed + 'km/h';

    const lat = data.coord.lat;
    const long = data.coord.lon;
    console.log(lat, long);
    document.querySelector('.coords').innerHTML = lat+'º latitude | ' + long+'º long'

    const cityTempMin = data.main.temp_min;
    const cityTempMax = data.main.temp_max;
    document.querySelector('.tempVar').innerHTML = 'Min: '+ cityTempMin + 'ºC | ' + 'Max: '+ cityTempMax + 'ºC';

    if(data.weather[0].main === 'Clouds') weatherIcon.src = 'img/clouds.png';
    if(data.weather[0].main === 'Clear') weatherIcon.src = 'img/clear.png';
    if(data.weather[0].main === 'Rain') weatherIcon.src = 'img/rain.png';
    if(data.weather[0].main === 'Drizzle') weatherIcon.src = 'img/drizzle.png';
    if(data.weather[0].main === 'Mist') weatherIcon.src = 'img/mist.png';
    if(data.weather[0].main === 'Snow') weatherIcon.src = 'img/snow.png';
    document.querySelector('.weather').classList.remove('hidden');
 
    }
    catch(err){
        alert(err.status + `\nPlease insert the correct city name`);
    }
}



// getWeather();