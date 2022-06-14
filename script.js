'use strict';


// ----- 📅 Current Year 📅 -----
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentYearText = document.getElementById('currentYearText');

currentYearText.textContent = currentYear;


// ----- 📅 Current Date / Day 📅 -----
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calculateFullDate = () => {
    let newDate = new Date();
    let currentDay = days[newDate.getDay() - 1];
    let currentDate = newDate.getDate();
    let currentMonth = months[newDate.getMonth()];
    let currentYear = newDate.getFullYear();

    return `${currentDay} ${currentDate} ${currentMonth}, ${currentYear}`;
}


// ----- Current Time -----
const calculateTime = () => {
    let newTime = new Date();
    let currentHour = newTime.getHours();
    let currentMinutes = newTime.getMinutes();

    // Update to include zeros for numbers less than ten
    return `${currentHour}:${currentMinutes}`;
}


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

        {
            "id": 1,
            "title": "Some Project",
            "summary": "This is a summary of some project...",
            "description": "",
            "date": {
                "dateCreated": "Wednesday 29 September, 2021",
                "timeCreated": "09:08",
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
                "dateCreated": "Tuesday 12 December, 2021",
                "timeCreated": "13:24",
                "hasDueDate": false,
                "dueDate": ""
            },
            "tasks": [],
            "isCompleted": false,
            "isInProgress": false,
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
                "dateCreated": "Saturday 1 May, 2019",
                "timeCreated": "12:45",
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
                "dateCreated": calculateFullDate(),
                "timeCreated": calculateTime(),
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

                // Create Main Inner
                const newMainContainer = document.createElement('div');
                newMainContainer.classList.add('main-inner');
                newMainContainer.id = 'mainContainer';
                main.appendChild(newMainContainer);

                // Create Project Detail
                const newMainInnerProjectDetail = document.createElement('div');
                newMainInnerProjectDetail.classList.add('main-inner__project-detail');
                newMainContainer.appendChild(newMainInnerProjectDetail);
                // ----- Project Detail (Button Container)
                const newProjectDetailButtonContainer = document.createElement('div');
                newProjectDetailButtonContainer.classList.add('project-detail__button-container');
                newMainInnerProjectDetail.appendChild(newProjectDetailButtonContainer);
                // --------------- Button Container (Button)
                const newProjectDetailButton = document.createElement('button');
                const newProjectDetailButtonIcon = document.createElement('i');
                newProjectDetailButton.classList.add('project-detail__button', 'btn-primary');
                newProjectDetailButtonIcon.classList.add('project-detail__button-icon', 'fa-solid', 'fa-trash-can');
                newProjectDetailButton.textContent = ' Delete Project';
                newProjectDetailButton.prepend(newProjectDetailButtonIcon);
                newProjectDetailButtonContainer.appendChild(newProjectDetailButton);
                // --------------- Button Container (Status Button Container)
                const newProjectDetailStatusButtonContainer = document.createElement('div');
                newProjectDetailStatusButtonContainer.classList.add('project-detail__status-button-container');
                newProjectDetailButtonContainer.appendChild(newProjectDetailStatusButtonContainer);
                // ------------------------- Status Button Container ('Not Started' Button)
                const newProjectDetailStatusButton__notStarted = document.createElement('button');
                const newProjectDetailStatusButton__notStartedIcon = document.createElement('i');
                newProjectDetailStatusButton__notStarted.classList.add('project-detail__button--status', 'project-detail__button', 'btn-primary');
                newProjectDetailStatusButton__notStartedIcon.classList.add('project-detail__button-icon', 'fa-solid', 'fa-circle-stop');
                newProjectDetailStatusButton__notStarted.textContent = ' Not Started';
                newProjectDetailStatusButton__notStarted.prepend(newProjectDetailStatusButton__notStartedIcon);
                newProjectDetailStatusButtonContainer.appendChild(newProjectDetailStatusButton__notStarted);
                if (!currentProject.isInProgress) {
                    newProjectDetailStatusButton__notStarted.classList.add('btn-selected');
                }
                // ------------------------- Status Button Container ('In Progress' Button)
                const newProjectDetailStatusButton__inProgress = document.createElement('button');
                const newProjectDetailStatusButton__inProgressIcon = document.createElement('i');
                newProjectDetailStatusButton__inProgress.classList.add('project-detail__button--status', 'project-detail__button', 'btn-primary');
                newProjectDetailStatusButton__inProgressIcon.classList.add('project-detail__button-icon', 'fa-solid', 'fa-spinner');
                newProjectDetailStatusButton__inProgress.textContent = ' In Progress';
                newProjectDetailStatusButton__inProgress.prepend(newProjectDetailStatusButton__inProgressIcon);
                newProjectDetailStatusButtonContainer.appendChild(newProjectDetailStatusButton__inProgress);
                if (currentProject.isInProgress) {
                    newProjectDetailStatusButton__inProgress.classList.add('btn-selected');
                }
                // ------------------------- Status Button Container ('Complete' Button)
                const newProjectDetailStatusButton__complete = document.createElement('button');
                const newProjectDetailStatusButton__completeIcon = document.createElement('i');
                newProjectDetailStatusButton__complete.classList.add('project-detail__button--status', 'project-detail__button', 'btn-primary');
                newProjectDetailStatusButton__completeIcon.classList.add('project-detail__button-icon', 'fa-solid', 'fa-circle-check');
                newProjectDetailStatusButton__complete.textContent = ' Complete';
                newProjectDetailStatusButton__complete.prepend(newProjectDetailStatusButton__completeIcon);
                newProjectDetailStatusButtonContainer.appendChild(newProjectDetailStatusButton__complete);
                if (currentProject.isCompleted) {
                    newProjectDetailStatusButton__complete.classList.add('btn-selected');
                }
                // ------------------------- Status Button Container (Star Button)
                const newProjectDetailStatusButton__star = document.createElement('button');
                const newProjectDetailStatusButton__starIcon = document.createElement('i');
                newProjectDetailStatusButton__star.classList.add('project-detail__button--priority', 'project-detail__button', 'btn-primary');
                newProjectDetailStatusButton__starIcon.classList.add('fa-solid', 'fa-star');
                newProjectDetailStatusButton__star.appendChild(newProjectDetailStatusButton__starIcon);
                newProjectDetailStatusButtonContainer.appendChild(newProjectDetailStatusButton__star);
                if (currentProject.isPrioritised) {
                    newProjectDetailStatusButton__star.classList.add('btn-selected');
                }
                // ----- Project Detail (Date Container)
                const newProjectDetailDateContainer = document.createElement('div');
                newProjectDetailDateContainer.classList.add('project-detail__date-container');
                newMainInnerProjectDetail.appendChild(newProjectDetailDateContainer);
                // --------------- Date Container (Date Created)
                const newProjectDetailDateContainer__dateCreated = document.createElement('p');
                const newProjectDetailDateContainer__dateCreatedStrong = document.createElement('strong');
                newProjectDetailDateContainer__dateCreated.textContent = `${currentProject.date.dateCreated} | ${currentProject.date.timeCreated}`;
                newProjectDetailDateContainer__dateCreatedStrong.textContent = 'Created: ';
                newProjectDetailDateContainer__dateCreated.prepend(newProjectDetailDateContainer__dateCreatedStrong);
                newProjectDetailDateContainer.appendChild(newProjectDetailDateContainer__dateCreated);
                // --------------- Date Container (Date Due)
                if (currentProject.date.hasDueDate) {
                    const newProjectDetailDateContainer__dateDue = document.createElement('p');
                    const newProjectDetailDateContainer__dateDueStrong = document.createElement('strong');
                    newProjectDetailDateContainer__dateDue.textContent = currentProject.date.dueDate;
                    newProjectDetailDateContainer__dateDueStrong.textContent = 'Date Due: ';
                    newProjectDetailDateContainer__dateDue.prepend(newProjectDetailDateContainer__dateDueStrong);
                    newProjectDetailDateContainer.appendChild(newProjectDetailDateContainer__dateDue);
                }
                // ----- Project Detail (Title)
                const newProjectDetailTitle = document.createElement('h3');
                newProjectDetailTitle.classList.add('project-detail__title');
                newProjectDetailTitle.textContent = currentProject.title;
                newMainInnerProjectDetail.appendChild(newProjectDetailTitle);
                // ----- Project Detail (Text Container)
                const newProjectDetailTextContainer = document.createElement('div');
                newProjectDetailTextContainer.classList.add('project-detail__text-container');
                newMainInnerProjectDetail.appendChild(newProjectDetailTextContainer);


                // Create Project Tasks
                const newMainInnerProjectTasks = document.createElement('div');
                newMainInnerProjectTasks.classList.add('main-inner__project-tasks');
                newMainContainer.appendChild(newMainInnerProjectTasks);

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




