const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const APIKey = 'af0b4cc913b7702ba6ac740edb093db4';

function getCityByLocation(lat, lon) {

    return fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKey}`)
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const city = data[0].name;
            console.log(`City: ${city}`)
            return city;
        } else {
            return '';
        }
    });
}

function getWeatherByCity(city) {
    if (city == '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=${currentLanguage}`)
        .then(response => response.json())
        .then(json => {
        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'pics/clear.png';
                    break;
                case 'Rain':
                    image.src = 'pics/rainy.png';
                    break;
                case 'Snow':
                    image.src = 'pics/snowy.png';
                    break;
                case 'Clouds':
                    image.src = 'pics/cloudy.png';
                    break;
                case 'Mist':
                    image.src = 'pics/mist.png';
                    break;
                case 'Haze':
                    image.src = 'pics/mist.png';
                    break;
                case 'Thunderstorm':
                    image.src = 'pics/thunder.png';
                    break;
                default:
                    image.src = 'pics/broken-clouds.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;

            const windSpeed = parseInt(json.wind.speed);  // You should already have this value stored
            wind.innerHTML = `${windSpeed}${translations[currentLanguage].windUnit}`;


            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoHWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoHWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200)
            }
        }



    });

};

search.addEventListener('click', function () {
    const city = document.querySelector('.search-box input').value;
    getWeatherByCity(city);
});

searchInput.addEventListener('keydown', function (event) {
    const city = document.querySelector('.search-box input').value;
    if (event.key === 'Enter') {
        getWeatherByCity(city);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getCityByLocation(latitude, longitude)
            .then(response => {
                getWeatherByCity(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    function error() {
        return;
    }
});
