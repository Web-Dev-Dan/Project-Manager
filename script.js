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


// ----- 🔎 Minimise / Maximise Aside Button 🔍 -----
let smallAside = false;

const contentContainer = document.getElementById('contentContainer');
const asideContainerInner = document.getElementById('asideContainerInner');
const resizeAsideButton = document.getElementById('resizeAsideButton');
const resizeAsideButtonIcon = document.getElementById('resizeAsideButtonIcon');

const resizeAside = () => {
    smallAside = !smallAside;

    if (smallAside) {
        contentContainer.classList.add('content-container__aside-small');
        asideContainerInner.classList.add('element-hidden');
        resizeAsideButtonIcon.classList.replace('fa-minimize', 'fa-maximize');
        resizeAsideButton.classList.add('btn-full-width');
    } else {
        contentContainer.classList.remove('content-container__aside-small');
        asideContainerInner.classList.remove('element-hidden');
        resizeAsideButtonIcon.classList.replace('fa-maximize', 'fa-minimize');
        resizeAsideButton.classList.remove('btn-full-width');
    }
}

resizeAsideButton.addEventListener('click', resizeAside);


// ----- 📝 Add New Items 📝 -----
let userData = {
    "userName": "User",
    "numberOfProjects": 0,
    "listOfProjects": [
        /*
        {
            "id": 1,
            "title": "Some Project",
            "summary": "This is a summary of some project...",
            "description": "",
            "date": {
                "dateCreated": "",
                "timeCreated": "",
                "hasDueDate": true,
                "dueDate": "15 August, 2022"
            },
            "tasks": [],
            "isCompleted": false,
            "isInProgress": true,
            "isIncomplete": true,
            "isPrioritised": true,
            "isDeleted": false
        },
        {
            "id": 2,
            "title": "Yet Another Project",
            "summary": "",
            "description": "",
            "date": {
                "dateCreated": "",
                "timeCreated": "",
                "hasDueDate": false,
                "dueDate": "15 August, 2022"
            },
            "tasks": [],
            "isCompleted": false,
            "isInProgress": true,
            "isIncomplete": true,
            "isPrioritised": false,
            "isDeleted": false
        },
        {
            "id": 3,
            "title": "To-Do List Project for Portfolio",
            "summary": "This is an advanced to-do list for my portfolio site. Features include adding, editing, and deleting items, as well as a large administrative section.",
            "description": "",
            "date": {
                "dateCreated": "",
                "timeCreated": "",
                "hasDueDate": true,
                "dueDate": "1 August, 2022"
            },
            "tasks": [],
            "isCompleted": false,
            "isInProgress": true,
            "isIncomplete": true,
            "isPrioritised": true,
            "isDeleted": false
        }
        */
    ]
};

const createNewProjectInput = document.getElementById('createNewProjectInput');
const createNewProjectInputBtn = document.getElementById('createNewProjectInputBtn');

let openProjectBtns;

const createNewProject = (e) => {
    e.preventDefault();

    if (createNewProjectInput.value) {
        console.log(`New item created called "${createNewProjectInput.value}".`);
        userData.listOfProjects.push({
            "id": userData.listOfProjects.length + 1,
            "title": createNewProjectInput.value,
            "summary": "",
            "description": "",
            "date": {
                "dateCreated": "",
                "timeCreated": "",
                "hasDueDate": false,
                "dueDate": ""
            },
            "tasks": [],
            "isCompleted": false,
            "isInProgress": false,
            "isIncomplete": true,
            "isPrioritised": false,
            "isDeleted": false
        });
        console.log(userData);

        // Remove projects and create new list container:
        // projectListContainer.remove();
        // const newProjectListContainer = document.createElement('div');
        // newProjectListContainer.classList.add('project-list-container');
        // newProjectListContainer.id = 'projectListContainer';
        // asideContainerInner.appendChild(newProjectListContainer);

        renderProjectListData();
    } else {
        return;
    }

    createNewProjectInput.value = '';

}

createNewProjectInputBtn.addEventListener('click', createNewProject);


// ----- 👀 Render Project List Data 👀 -----

const renderProjectListData = () => {

    let projectListContainer = document.getElementById('projectListContainer');

    // Remove current projects to re-render:
    projectListContainer.remove();

    const newProjectListContainer = document.createElement('div');
    newProjectListContainer.classList.add('project-list-container');
    newProjectListContainer.id = 'projectListContainer';
    projectListContainer = newProjectListContainer;
    asideContainerInner.appendChild(newProjectListContainer);

    // Render userData to browser:
    userData.listOfProjects.forEach(project => {

        const newProjectBox = document.createElement('div');
        newProjectBox.classList.add('project-list-container__box');
        projectListContainer.appendChild(newProjectBox);

        const newContentContainer = document.createElement('div');
        newContentContainer.classList.add('project-box__content-container');
        newProjectBox.appendChild(newContentContainer);

        const newIconContainer = document.createElement('div');
        newIconContainer.classList.add('project-box__icon-container');
        newProjectBox.appendChild(newIconContainer);

        const newTitle = document.createElement('h3');
        newTitle.classList.add('project-box__title');
        newTitle.textContent = project.title;
        newContentContainer.appendChild(newTitle);

        if (project.summary) {
            const newSummary = document.createElement('p');
            newSummary.classList.add('project-box__summary');
            newSummary.textContent = project.summary;
            newContentContainer.appendChild(newSummary);
        } else {
            // console.log('No summary');
        }

        if (project.date.hasDueDate) {
            const newNotification = document.createElement('p');
            newNotification.classList.add('project-box__notification');
            const newBoldText = document.createElement('span');
            newBoldText.classList.add('bold-text');
            newBoldText.textContent = 'Due Date: ';
            newNotification.textContent = project.date.dueDate;
            newNotification.prepend(newBoldText);
            newContentContainer.appendChild(newNotification);
        } else {
            // console.log('No due date');
        }

        const newOpenBtn = document.createElement('button');
        newOpenBtn.classList.add('project-box__button', 'btn-primary');
        newOpenBtn.setAttribute('data-id', project.id);
        newOpenBtn.textContent = 'Open Project';
        newContentContainer.appendChild(newOpenBtn);

        const newOpenBtnIcon = document.createElement('i');
        newOpenBtnIcon.classList.add('project-box__button-icon', 'fa-solid', 'fa-arrow-up-right-from-square');
        newOpenBtn.prepend(newOpenBtnIcon);

        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.classList.add('btn-transparent', 'project-box__delete-btn');
        newIconContainer.appendChild(newDeleteBtn);

        const newDeleteBtnIcon = document.createElement('i');
        newDeleteBtnIcon.classList.add('project-box__icon', 'fa-solid', 'fa-trash-can');
        newDeleteBtn.appendChild(newDeleteBtnIcon);

        if (project.isPrioritised) {
            const newPrioritisedIcon = document.createElement('i');
            newPrioritisedIcon.classList.add('project-box__icon', 'fa-solid', 'fa-star');
            newIconContainer.appendChild(newPrioritisedIcon);
        } else {
            // console.log('Not prioritised');
        }

        // Update 'open project' buttons
        openProjectBtns = document.querySelectorAll('.project-box__button');
    });


    // ----- 📭 Open Projects: 📭 -----
    const main = document.getElementById('main');
    let mainContainer = document.getElementById('mainContainer');

    if (openProjectBtns) {
        const openProjects = (id) => {

            // console.log(userData.listOfProjects[id - 1]);
            let currentProject = userData.listOfProjects[id - 1];

            if (mainContainer) {
                mainContainer = document.getElementById('mainContainer');
                mainContainer.remove();


                const newMainContainer = document.createElement('div');
                newMainContainer.classList.add('main-inner');
                newMainContainer.id = 'mainContainer';
                main.appendChild(newMainContainer);

                // const newTitle = document.createElement('h1');
                // newTitle.classList.add('project-detail__title');
                // newTitle.textContent = currentProject.title;
                // newMainContainer.appendChild(newTitle);
            }




            /*
            RENDER THIS TO MAIN (DELETE INNER CONTAINER FIRST)
            console.log(`Open project button pressed for data-type ${id}.`);
            const testBox = document.getElementById('test');
            const newP = document.createElement('p');
            newP.textContent = userData.listOfProjects[id - 1].title;
            testBox.appendChild(newP);
            */
        }

        openProjectBtns.forEach(button => {
            button.addEventListener('click', () => {
                console.log(Number(button.getAttribute('data-id'))); /* Temporary */
                openProjects(button.getAttribute('data-id'));
            });
        });
    }



}

renderProjectListData();




