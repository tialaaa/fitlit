// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';
import Sleep from './Sleep';

const userInfoBody = document.getElementById('userInfoBody');
const greeting = document.getElementById('helloUser');
const stepGoal = document.getElementById('stepGoal');
const dailyHydraDom = document.getElementById('dailyHydration');
const weeklyHydraDom = document.getElementById('weeklyHydration');
const dailySleep = document.getElementById('dailySleep');
const weeklySleep = document.getElementById('weeklySleep');
const averageSleep = document.getElementById('averageSleep');

let allUsers, allHydration, randomId, hydrationByDate, allSleep

// => wrap the promise all in a function and have it be called on
// load

Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep')])
  .then(data => {
    allUsers = new UserRepository(data[0].users);
    allHydration = new UserHydration(data[1].hydrationData);
    allSleep = new Sleep(data[2].sleepData);
  })
  .then(() => {
    randomId = generateRandomId();
    renderUserInfo();
    sortByDate(allHydration.hydrationData);
    sortByDate(allSleep.sleepData);
    renderHydration();
    renderSleep();
  })

  function sortByDate(data) {
    data.sort((a,b) => {
      const dateA = a.date;
      const dateB = b.date;
        if (dateA < dateB) {
          return 1
        }
        if (dateA > dateB) {
          return -1
        } 
          return 0
    })
  }

  function generateRandomId() {
    return Math.floor(Math.random() * allUsers.usersData.length) + 1;
  }

  function renderUserInfo() {
    const randomUser = allUsers.findUser(randomId);

    userInfoBody.innerHTML = `ID: ${randomUser.id}<br>
    Name: ${randomUser.name}<br>
    Address: ${randomUser.address}<br>
    Email: ${randomUser.email}<br>
    Stride Length: ${randomUser.strideLength}<br>
    Daily Step Goal: ${randomUser.dailyStepGoal}<br>
    `

    greeting.innerText = `Welcome, ${allUsers.findFirstName(randomId)}!`

    stepGoal.innerText = `Your step goal: ${randomUser.dailyStepGoal} versus Average step goal: ${allUsers.calcAvgStepGoal()}`
  }

  function renderHydration() {
    dailyHydraDom.innerText = `You have drank ${allHydration.userHydrationByDate(allHydration.hydrationData[0].date, randomId)} ounces of water today`
    // weeklyHydraDom.innerText = `${allHydration.weeklyUserHydrationReport(allHydration.hydrationData[0].date, randomId)}`
    let weekObject = allHydration.weeklyUserHydrationReport(allHydration.hydrationData[0].date, randomId)
    let weekEntries = Object.entries(weekObject)
    weekEntries.forEach((day) => {
      weeklyHydraDom.innerHTML += `${day[0]}: ${day[1]} ounces drank<br>`
    })
    let drank = Object.values(weekObject)
    let weekDays = Object.keys(weekObject)
  }

  function renderSleep() {
    const latestDateData = allSleep.getUserSleepByID(randomId)[0]
    
    dailySleep.innerHTML = `Hours slept: ${allSleep.findHoursByDate(randomId, latestDateData.date)}<br>
    Quality of sleep: ${allSleep.findQualityByDate(randomId,latestDateData.date)}`
  
    let weeklySleepObj = allSleep.findWeeklyHours(randomId, latestDateData.date);
    let arrayOfEntries = Object.entries(weeklySleepObj);
    arrayOfEntries.forEach((day) => {
      weeklySleep.innerHTML += `${day[0]}: ${day[1]} hours slept<br>`
    })
  }

