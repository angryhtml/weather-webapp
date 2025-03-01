const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const APIKey = 'af0b4cc913b7702ba6ac740edb093db4';

let currentCity = ''; // Переменная для хранения текущего города
let isSearchCompleted = false; // Флаг для отслеживания завершения поиска

function getCityByLocation(lat, lon) {
    return fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const city = data[0].name;
                console.log(`City: ${city}`);
                return city;
            } else {
                return '';
            }
        });
}

function getWeatherFromAPI(city) {
    if (city == '') return;

    const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}&lang=${currentLanguage}`;

    return fetch(API_WEATHER)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return response.json();
                }
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            throw error;
        });
}

function getWeatherByCity(city) {
    if (city == '') return;

    getWeatherFromAPI(city)
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');

                searchInput.value = '';
                searchInput.focus();

                return;
            }

            isSearchCompleted = true; // Поиск завершён

            // Остальная логика для отображения погоды
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent == city && prevLanguage == currentLanguage) {
                return;
            }

            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 1700);

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

            const windSpeed = parseInt(json.wind.speed);
            wind.innerHTML = `${windSpeed}${translations[currentLanguage].windUnit}`;

            const cloneContainers = ['.info-weather', '.info-humidity', '.info-wind'];

            cloneContainers.forEach(selector => {
                const original = document.querySelector(selector);
                const clones = document.querySelectorAll(`${selector}.active-clone`);

                clones.forEach(clone => clone.remove());

                const newClone = original.cloneNode(true);
                newClone.classList.add('active-clone');
                newClone.id = `clone-${selector.replace('.', '')}`;

                setTimeout(() => {
                    original.insertAdjacentElement('afterend', newClone);
                }, 1700);
            });
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

document.getElementById('en').addEventListener('click', () => {
    changeLanguage('en');

    if (currentCity) {
        getWeatherByCity(currentCity); // Обновляем данные на английском
    }
});

document.getElementById('ru').addEventListener('click', () => {
    changeLanguage('ru');

    if (currentCity) {
        getWeatherByCity(currentCity); // Обновляем данные на русском
    }
});

search.addEventListener('click', function () {
    const city = document.querySelector('.search-box input').value;
    currentCity = city; // Сохраняем текущий город
    getWeatherByCity(city);
});

searchInput.addEventListener('keydown', function (event) {
    const city = document.querySelector('.search-box input').value;
    if (event.key === 'Enter') {
        currentCity = city; // Сохраняем текущий город
        getWeatherByCity(city);
    }
});

searchInput.addEventListener('focus', function () {
    if (isSearchCompleted) {
        searchInput.value = ''; // Очищаем поле ввода
        isSearchCompleted = false; // Сбрасываем флаг
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
            .then(city => {
                if (city) {
                    currentCity = city; // Сохраняем город
                    searchInput.value = city; // Обновляем поле ввода
                    getWeatherByCity(city); // Загружаем погоду
                } else {
                    console.warn('No city found for your location. Please enter a city manually.');
                    alert('No city found for your location. Please enter a city manually.');
                    searchInput.value = ''; // Очищаем поле ввода
                    searchInput.focus();    // Устанавливаем фокус на поле ввода
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    function error() {
        return;
    }
});
