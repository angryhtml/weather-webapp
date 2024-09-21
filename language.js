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
        windSpeed: "Скорость ветра",
        notFoundMessage: "Упс! Мы не смогли найти это место.",
        windUnit: "Км/ч"
    }
}

function changeLanguage(language) {
    document.querySelector('.search-box input').placeholder = translations[language].chooseLocation;
}

// Обработчики событий для кнопок смены языка
document.querySelector('.change-english').addEventListener('click', () => {
    changeLanguage('en');
});

document.querySelector('.change-russian').addEventListener('click', () => {
    changeLanguage('ru');
});

changeLanguage('en');