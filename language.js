const translations = {
    en: {
        chooseLocation: "Choose your location",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        notFoundMessage: "Whoops! We couldn't find that location.",
        windUnit: "M/s",
        weather: {
            Clear: "Clear",
            Rain: "Rain",
            Snow: "Snow",
            Clouds: "Clouds",
            Mist: "Mist",
            Haze: "Haze",
            Thunderstorm: "Thunderstorm",
            default: "Broken clouds"
        }
    },

    ru: {
        chooseLocation: "Выберите ваше местоположение",
        humidity: "Влажность",
        windSpeed: "Ветер",
        notFoundMessage: "Упс! Мы не смогли найти <br> это место.",
        windUnit: "М/с",
        weather: {
            Clear: "Ясно",
            Rain: "Дождь",
            Snow: "Снег",
            Clouds: "Облачно",
            Mist: "Туман",
            Haze: "Туман",
            Thunderstorm: "Гроза",
            default: "Переменная облачность"
        }
    }
}

let currentLanguage = 'en';

function changeLanguage(language) {
    currentLanguage = language;
    // Обновляем основные элементы
    document.querySelector('.search-box input').placeholder = translations[language].chooseLocation;
    document.querySelector('.humidity p').textContent = translations[language].humidity;
    document.querySelector('.wind p').textContent = translations[language].windSpeed;
    document.querySelector('.not-found p').innerHTML = translations[language].notFoundMessage;
    document.querySelector('.info-wind span').textContent = translations[language].windUnit;

    // Переводим клон
    const cloneInfoWindElements = document.querySelectorAll('#clone-info-wind span');
    cloneInfoWindElements.forEach(clone => {
        clone.textContent = translations[language].windUnit;
    });

    // Обновляем описание погоды
    const weatherElement = document.querySelector('.weather-box .description');
    const weatherCondition = weatherElement.dataset.condition; // Используем data-condition для текущего состояния
    if (translations[language].weather[weatherCondition]) {
        weatherElement.textContent = translations[language].weather[weatherCondition];
    }

    // Переводим описание погоды в клонах
    const cloneWeatherElements = document.querySelectorAll('.weather-box .description.active-clone');
    cloneWeatherElements.forEach(clone => {
        if (translations[language].weather[weatherCondition]) {
            clone.textContent = translations[language].weather[weatherCondition];
        }
    });
}

// Обработчики событий для кнопок смены языка
document.getElementById('en').addEventListener('click', () => {
    changeLanguage('en');
});

document.getElementById('ru').addEventListener('click', () => {
    changeLanguage('ru');
});

// Изначальный выбор языка
changeLanguage('en');