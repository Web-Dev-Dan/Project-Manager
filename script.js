'use strict';


// ----- 📅 Current Year 📅 -----
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentYearText = document.getElementById('currentYearText');

currentYearText.textContent = currentYear;


// ----- ❗️ Close Notification Bar ❗️ -----
const notificationBar = document.getElementById('notificationBar');
const notificationBar__CloseBtn = document.getElementById('notificationBar__CloseBtn');

const closeNotificationBar = () => {
    notificationBar.classList.add('element-hidden');
}

notificationBar__CloseBtn.addEventListener('click', closeNotificationBar);


// ----- 🌈 Colour Themes 🌈 -----

let currentColourTheme = 'stella';

const getColourTheme = (theme) => {
    const selectedColorPalette = theme;

    fetch('./data/ColorPalettes.json')
        .then(response => response.json())
        .then(data => {
            const themes = data.ColorPalettes;
            themes.forEach(theme => {
                if (theme.name === selectedColorPalette) {
                    document.documentElement.style.setProperty('--color-primary', theme.colors.colorPrimary);
                    document.documentElement.style.setProperty('--color-light', theme.colors.colorLight);
                    document.documentElement.style.setProperty('--color-dark', theme.colors.colorDark);

                    // console.log(theme.name);
                    // console.log(theme.colors);
                } else {
                    return;
                }
            });
        })
        .catch(error => {
            console.error(error);
        })
}

getColourTheme(currentColourTheme); // Call a function and pass in the theme name (stored in variable) to change.







// toggleLightDarkBtn

// ----- 🔆 Toggle Light / Dark Mode 🌙 -----
let isLightMode = true;
let isDarkMode = false;

const toggleLightDarkModeBtn = document.getElementById('toggleLightDarkModeBtn');
const toggleLightDarkModeBtn__icon = document.getElementById('toggleLightDarkModeBtn__icon');

const toggleLightDarkMode = () => {
    isLightMode = !isLightMode;
    isDarkMode = !isDarkMode;

    if (isLightMode) {
        getColourTheme('stella');
        toggleLightDarkModeBtn__icon.classList.replace('fa-sun', 'fa-moon');
    } else if (isDarkMode) {
        getColourTheme('eclipse');
        toggleLightDarkModeBtn__icon.classList.replace('fa-moon', 'fa-sun');
    }
}

toggleLightDarkModeBtn.addEventListener('click', toggleLightDarkMode);