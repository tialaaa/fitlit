// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import Chart from 'chart.js/auto';

import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import UserActivity from './activityRepository';


const userInfoBody = document.getElementById('userInfoBody');
const greeting = document.getElementById('helloUser');
const stepGoal = document.getElementById('stepGoal');

const dailyHydraDom = document.getElementById('dailyHydration');
const weeklyHydraDom = document.getElementById('weeklyHydration');
const dailySleep = document.getElementById('dailySleep');
const weeklyHours = document.getElementById('weeklyHours');
const weeklyQuality = document.getElementById('weeklyQuality');
const averageHours = document.getElementById('averageHours');
const averageQuality = document.getElementById('averageQuality');
const dailySteps = document.getElementById('dailySteps');
const dailyMinAct = document.getElementById('dailyMinAct');
const dailyMilWalked = document.getElementById('dailyMilesWalked');
const weeklyActDom = document.getElementById('actWeeklyView')
const weekHydraChart = document.getElementById('weekHydraChart')
const weekSleepChart = document.getElementById('weekSleepChart')
let allUsers, allHydration, randomId, hydrationByDate, allSleep, allActivity, actWeekObj


// => wrap the promise all in a function and have it be called on
// load


Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')])
  .then(data => {
    allUsers = new UserRepository(data[0].users);
    allHydration = new UserHydration(data[1].hydrationData);
    allSleep = new Sleep(data[2].sleepData);
    allActivity = new UserActivity(data[3].activityData, data[0].users)
  })
  .then(() => {
    randomId = generateRandomId();
    renderUserInfo();
    sortByDate(allHydration.hydrationData);
    sortByDate(allSleep.sleepData);
    sortByDate(allActivity.activityData)
    renderHydration();
    renderSleep();
     actWeekObj = weeklyActivityObject(randomId, allActivity.activityData[0].date)
    renderActivityInfo()
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
    // let weekEntries = Object.entries(weekObject)
    // weekEntries.forEach((day) => {
    //   weeklyHydraDom.innerHTML += `${day[0]}: ${day[1]} ounces drank<br>`
    // })
    let drank = Object.values(weekObject)
    let weekDays = Object.keys(weekObject)
    // createGraph(weekHydraChart, 'line', weekDays, drank)
    new Chart(document.getElementById("weekHydraChart"), {
      type: 'line',
      data: {
        labels: [weekDays[0],weekDays[1],weekDays[2],weekDays[3],weekDays[4],weekDays[5],weekDays[6]],
        datasets: [{ 
            data: [drank[0],drank[1],drank[2],drank[3],drank[4],drank[5],drank[6]],
            label: "Ounces Drank",
            borderColor: "#3e95cd",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Ounces of water drank per day!'
        }
      }
    });
  }

  function renderSleep() {
    const latestDateData = allSleep.getUserSleepByID(randomId)[0]
    
    dailySleep.innerHTML = `Hours slept: ${allSleep.findHoursByDate(randomId, latestDateData.date)}<br>
    Quality of sleep: ${allSleep.findQualityByDate(randomId,latestDateData.date)}`
  
    let weeklySleepObj = allSleep.findWeeklyHours(randomId, latestDateData.date);
    let weeklyQualityObj = allSleep.findWeeklyQuality(randomId, latestDateData.date);
  
    let arrayOfHours = Object.entries(weeklySleepObj);
    console.log(arrayOfHours[0][0])
    let arrayOfQuality = Object.entries(weeklyQualityObj);
    console.log(arrayOfQuality)

    new Chart(document.getElementById("weekSleepChart"), {
      type: 'bar',
      data: {
        labels: [arrayOfHours[0][0],arrayOfHours[1][0],arrayOfHours[2][0],arrayOfHours[3][0],arrayOfHours[4][0],arrayOfHours[5][0],arrayOfHours[6][0]],
        datasets: [{ 
            data: [arrayOfHours[0][1],arrayOfHours[1][1],arrayOfHours[2][1],arrayOfHours[3][1],arrayOfHours[4][1],arrayOfHours[5][1],arrayOfHours[6][1]],
            label: "Total Hours Slept",
            backgroundColor: 'purple',
            borderColor: "#3e95cd",
            fill: false
          },
      { 
        data: [arrayOfQuality[0][1],arrayOfQuality[1][1],arrayOfQuality[2][1],arrayOfQuality[3][1],arrayOfQuality[4][1],arrayOfQuality[5][1],arrayOfQuality[6][1]],
        label: "Quality Hours Slept",
        backgroundColor: 'blue',
        borderColor: "#3e95cd",
        fill: false
      }]
  },
      options: {
        title: {
          display: true,
          text: 'Ounces of water drank per day!',
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      }
    });

  //   arrayOfHours.forEach((day) => {
  //     weeklyHours.innerHTML += `${day[0]}: ${day[1]} hours slept<br>`;
  //   })
   
  //   arrayOfQuality.forEach((day) => {
  //     weeklyQuality.innerHTML += `${day[0]}: sleep quality ${day[1]} <br>`;
  //   })
    
    averageHours.innerText = `Average hours slept: ${allSleep.calcAvgDailyHours(randomId)}`;
    averageQuality.innerText = `Average quality of sleep: ${allSleep.calcAvgSleepQuality(randomId)}`;
  }

  function renderActivityInfo() {
    
    dailySteps.innerText = `You have logged ${allActivity.activityData[randomId].numSteps} steps today!`
    dailyMilWalked.innerText = `You have walked ${allActivity.dailyMilesWalked(randomId, allActivity.activityData[randomId].date)} miles today!`
    dailyMinAct.innerText = `You have been active for ${allActivity.dailyMinActive(randomId, allActivity.activityData[randomId].date)} minutes today!`

    
    let actWeekEntries = Object.entries(actWeekObj)
    
    actWeekEntries.forEach((day) => {
      console.log(day, 'yurrrrrr')
      console.log(allActivity.stepGoalReached(randomId, allActivity.activityData[randomId].date),'true function', day[0] === allActivity.activityData[randomId].date, 'condtional', allActivity.activityData[randomId].date, 'date', randomId, 'id')
      if (allActivity.stepGoalReached(randomId, day[0])) {
        console.log('yooo')
        weeklyActDom.innerHTML += `${day[0]}: ${day[1]}, You have reached your Goal!<br>`
      } else {
        console.log('fail')
        weeklyActDom.innerHTML += `${day[0]}: ${day[1]}, You almost reached your Goal<br>`
      }
    })
  }



  function weeklyActivityObject(id, startDate) {
    let userActivityStat = allActivity.getUserActivityById(id);
    let dateIndex = userActivityStat.findIndex(dailyActivity => dailyActivity.date === startDate);
    let activityOfTheWeek = userActivityStat.splice(dateIndex,7).reduce((acc,obj) => {
      acc[obj.date] = obj.numSteps
      return acc
    }, {})
    return activityOfTheWeek
  }
  // function createGraph(querySelect,typeOfGraph,x,y) {
  //   new Chart(querySelect, {
  //       type: typeOfGraph,
  //       data: {
  //         labels: [x[0],x[1],x[2],x[3],x[4],x[5],x[6]],
  //         datasets: [y[0],y[1],y[2],y[3],y[4],y[5],y[6]]
  //       }
  //     })
      
  //   }

    