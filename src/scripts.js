// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

// import SomeClassYouChangeTheName from './SomeClassYouChangeTheName';
import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';
import UserActivity from './activityRepository';

// const newClass = new SomeClassYouChangeTheName();

const userInfoBody = document.getElementById('userInfoBody');
const greeting = document.getElementById('helloUser');
const stepGoal = document.getElementById('stepGoal');
const dailyHydraDom = document.getElementById('dailyHydration')
const weeklyHydraDom = document.getElementById('weeklyHydration')
const dailySteps = document.getElementById('dailySteps');
const dailyMinAct = document.getElementById('dailyMinAct');
const dailyMilWalked = document.getElementById('dailyMilesWalked');
const weeklyActDom = document.getElementById('actWeeklyView')



let allUsers, allHydration, randomId, hydrationByDate, allActivity, actWeekObj

// => wrap the promise all in a function and have it be called on
// load

Promise.all([fetchData('users'), fetchData('hydration'), fetchData('activity')])
  .then(data => {
    allUsers = new UserRepository(data[0].users) 
    allHydration = new UserHydration(data[1].hydrationData)
    allActivity = new UserActivity(data[2].activityData, data[0].users)
  })
  .then(() => {
    randomId = generateRandomId();
    renderUserInfo();
    sortByDate(allHydration.hydrationData);
    sortByDate(allActivity.activityData)
    renderHydration();
    actWeekObj = weeklyActivityObject(randomId, allActivity.activityData[0].date)
    renderActivityInfo()
    //functionToManipulateDOM()
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

  function renderActivityInfo() {
    
    dailySteps.innerText = `You have logged ${allActivity.activityData[randomId].numSteps} steps today!`
    dailyMilWalked.innerText = `You have walked ${allActivity.dailyMilesWalked(randomId, allActivity.activityData[randomId].date)} miles today!`
    dailyMinAct.innerText = `You have been active for ${allActivity.dailyMinActive(randomId, allActivity.activityData[randomId].date)} minutes today!`
    console.log(actWeekObj, 'yurrrrrr')
    // let actObj = allActivity.weeklyActivityObj(randomId, allActivity.activityData[randomId].date)
    // console.log(actObj)
    let actWeekEntries = Object.entries(actWeekObj)
    actWeekEntries.forEach((day) => {
      if (allActivity.stepGoalReached(randomId, allActivity.activityData[randomId].date) && day[0] === allActivity.activityData[randomId].date) {
        weeklyActDom.innerHTML += `${day[0]}: ${day[1]}, You have reached your Goal!<br>`
      } else {
        weeklyActDom.innerHTML += `${day[0]}: ${day[1]}, You almost reached your Goal<br>`
      }
    })
    // if (allActivity.stepGoalReached(randomId, allActivity.activityData[randomId].date)) {
    //   weeklyActDom.innerText = `You reached your daily step count goal, Hooray!`
    // } else {
    //   weeklyActDom.innerText = `You didn't reach your step count goal today and thats alright! Lets get it Tomorrow instead!`
    // }
    
  }


  // maybe invoke a baby function when we have the data in order to tunr
  function weeklyActivityObject(id, startDate) {
    let userActivityStat = allActivity.getUserActivityById(id);
    let dateIndex = userActivityStat.findIndex(dailyActivity => dailyActivity.date === startDate);
    let activityOfTheWeek = userActivityStat.splice(dateIndex,7).reduce((acc,obj) => {
      acc[obj.date] = obj.numSteps
      return acc
    }, {})
    // console.log(activityOfTheWeek, 'FIRINF')
    return activityOfTheWeek
  }