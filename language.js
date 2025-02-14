const translations = {
    en: {
        chooseLocation: "Choose your location",
        humidity: "Humidity",
        windSpeed: "Wind Speed",
        notFoundMessage: "Whoops! We couldn't find that location.",
        windUnit: "M/s"
    },
    ru: {
        chooseLocation: "Выберите ваше местоположение",
        humidity: "Влажность",
        windSpeed: "Ветер",
        notFoundMessage: "Упс! Мы не смогли найти <br> это место.",
        windUnit: "М/с"
    }
}

function updateWindUnit(newLanguage) {
    const cloneInfoHWind = document.getElementById('clone-info-wind').innerHTML;
    const windSpeed = cloneInfoHWind.replace(/M\/s|М\/с/g, `${translations[newLanguage].windUnit}`);
    cloneInfoHWind.innerHTML = `${windSpeed}`;
}

let currentLanguage = 'en';
let prevLanguage = 'en'

function changeLanguage(language) {
    prevLanguage = currentLanguage;
    currentLanguage = language;

    document.querySelector('.search-box input').placeholder = translations[language].chooseLocation;
    document.querySelector('.humidity p').textContent = translations[language].humidity;
    document.querySelector('.wind p').textContent = translations[language].windSpeed;
    document.querySelector('.not-found p').innerHTML = translations[language].notFoundMessage;
    document.querySelector('.info-wind span').textContent = translations[language].windUnit;
    updateWindUnit(language);
}

changeLanguage('en');
