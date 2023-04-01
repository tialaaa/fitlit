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


const userIdInfo = document.getElementById('userIdInfo')
const userNameInfo = document.getElementById('userNameInfo')
const userAddressInfo = document.getElementById('userAddressInfo')
const userEmailInfo = document.getElementById('userEmailInfo')
const userSteps = document.getElementById('userSteps');
const userStrideLength = document.getElementById('userStride');
const greeting = document.getElementById('helloUser');
const userStepGoal = document.getElementById('userStepGoal');
const avgStepGoal = document.getElementById('avgStepGoal');

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
userIdInfo.innerText = `ID: ${randomUser.id}`
    userNameInfo.innerText = `Name: ${randomUser.name}`
    userAddressInfo.innerText = `Address: ${randomUser.address}`
    userEmailInfo.innerText = `Email: ${randomUser.email}`


  greeting.innerText = `Welcome, ${allUsers.findFirstName(randomId)}!`

  userSteps.innerText = `${randomUser.dailyStepGoal}`
  userStepGoal.innerText = `${randomUser.dailyStepGoal}`
  userStrideLength.innerText = `${randomUser.strideLength}`
  avgStepGoal.innerText = `${allUsers.calcAvgStepGoal()}`

  // ALTERNATE DISPLAY OPTION USING A CHART
  new Chart(document.getElementById('stepGoalChart'), {
    type: 'polarArea',
    data: {
      labels: ['Your Goal', 'Average User'],
      datasets: [{
        // label: 'Step Goal',
        data: [randomUser.dailyStepGoal, allUsers.calcAvgStepGoal()],
        backgroundColor: [
          'rgb(57, 64, 233)',
          'rgb(201, 203, 207)',
        ]
      }],
    },
    options: {
      plugins: {
        title: {
          display: true,
          position: 'top',
          text: 'Daily Step Goal',
          color: 'black',
          font: {
            size: 14,
          },
        },
        legend: {
          position: 'bottom',
          reverse: 'true',
        },
      },
    }
  });
};


  function renderHydration() {
    dailyHydraDom.innerText = `${allHydration.userHydrationByDate(allHydration.hydrationData[0].date, randomId)}`
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
    
    
    
    
    // new Chart(weekHydraChart, {
    //   type: 'line',
    //   data: {
    //     labels: [weekDays[0],weekDays[1],weekDays[2],weekDays[3],weekDays[4]],
    //     datasets: [drank[0],drank[1],drank[2],drank[3],drank[4]]
    //   }
    // })
  }

  function renderSleep() {
    const latestDateData = allSleep.getUserSleepByID(randomId)[0]
    
    dailySleep.innerHTML = `Hours slept: ${allSleep.findHoursByDate(randomId, latestDateData.date)}<br>
    Quality of sleep: ${allSleep.findQualityByDate(randomId,latestDateData.date)}`
  
    let weeklySleepObj = allSleep.findWeeklyHours(randomId, latestDateData.date);
    let weeklyQualityObj = allSleep.findWeeklyQuality(randomId, latestDateData.date);
  
    let arrayOfHours = Object.entries(weeklySleepObj);
    let arrayOfQuality = Object.entries(weeklyQualityObj);

    arrayOfHours.forEach((day) => {
      weeklyHours.innerHTML += `${day[0]}: ${day[1]} hours slept<br>`;
    })
   
    arrayOfQuality.forEach((day) => {
      weeklyQuality.innerHTML += `${day[0]}: sleep quality ${day[1]} <br>`;
    })
    
    averageHours.innerText = `Average hours slept: ${allSleep.calcAvgDailyHours(randomId)}`;
    averageQuality.innerText = `Average quality of sleep: ${allSleep.calcAvgSleepQuality(randomId)}`;
  }

  function renderActivityInfo() {
    const randomUser = allUsers.findUser(randomId)
    console.log(randomUser.id, 'id')
   dailySteps.innerText = `${allActivity.activityData[randomId].numSteps}`
    dailyMilWalked.innerText = `${allActivity.dailyMilesWalked(randomId, allActivity.activityData[randomId].date)}`
    dailyMinAct.innerText = `${allActivity.dailyMinActive(randomId, allActivity.activityData[randomId].date)}`


    let actWeekSteps = Object.values(actWeekObj)
    let actWeekDates = Object.keys(actWeekObj)
console.log(randomUser.dailyStepGoal, 'goal')
new Chart(document.getElementById("weeklyActChart"), {
  type: 'line',
  data: {
    labels: [actWeekDates[0],actWeekDates[1],actWeekDates[2],actWeekDates[3],actWeekDates[4],actWeekDates[5],actWeekDates[6]],
    datasets: [{ 
        data: [actWeekSteps[0],actWeekSteps[1],actWeekSteps[2],actWeekSteps[3],actWeekSteps[4],actWeekSteps[5],actWeekSteps[6]],
        label: "Steps Walked",
        borderColor: "#3e95cd",
        fill: false
      }, {
        data: [randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal],
        label: "Daily Step Goal",
        borderColor: "#000",
        fill: false
      }
    ]    
  }})
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

    