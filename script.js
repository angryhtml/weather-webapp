const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'af0b4cc913b7702ba6ac740edb093db4';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');
        
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        console.log(json.weather[0].main);

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
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    });

});
// https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=af0b4cc913b7702ba6ac740edb093db4