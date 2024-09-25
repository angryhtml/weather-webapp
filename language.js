const translations = {
    en: {
        chooseLocation: "Choose your location",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        notFoundMessage: "Whoops! We couldn't find that location.",
        windUnit: "Km/h"
    },
    ru: {
        chooseLocation: "Выберите ваше местоположение",
        humidity: "Влажность",
        windSpeed: "Ветер",
        notFoundMessage: "Упс! Мы не смогли найти <br> это место.",
        windUnit: "Км/ч"
    }
}

function changeLanguage(language) {
    document.querySelector('.search-box input').placeholder = translations[language].chooseLocation;
    document.querySelector('.humidity p').textContent = translations[language].humidity;
    document.querySelector('.wind p').textContent = translations[language].windSpeed;
    document.querySelector('.not-found p').innerHTML = translations[language].notFoundMessage;
    document.querySelector('.info-wind span').textContent = translations[language].windUnit;
}

// Обработчики событий для кнопок смены языка
document.querySelector('.change-english').addEventListener('click', () => {
    changeLanguage('en');
});

document.querySelector('.change-russian').addEventListener('click', () => {
    changeLanguage('ru');
});

changeLanguage('en');