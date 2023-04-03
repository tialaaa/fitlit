import './css/styles.css';
import Chart from 'chart.js/auto';
import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import UserActivity from './activityRepository';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

const userIdInfo = document.getElementById('userIdInfo');
const userNameInfo = document.getElementById('userNameInfo');
const userAddressInfo = document.getElementById('userAddressInfo');
const userEmailInfo = document.getElementById('userEmailInfo');
const userSteps = document.getElementById('userSteps');
const userStrideLength = document.getElementById('userStride');
const greeting = document.getElementById('helloUser');
const dailyHydraDom = document.getElementById('dailyHydration');
const dailySleep = document.getElementById('dailySleep');
const dailyQuality = document.getElementById('dailyQuality');
const averageHours = document.getElementById('averageHours');
const averageQuality = document.getElementById('averageQuality');
const friendCont = document.querySelector('.friendCont');
const dailySteps = document.getElementById('dailySteps');
const dailyMinAct = document.getElementById('dailyMinAct');
const dailyMilWalked = document.getElementById('dailyMilesWalked');

let allUsers, allHydration, randomId, allSleep, allActivity, actWeekObj;

Promise.all([fetchData('users'), fetchData('hydration'), fetchData('sleep'), fetchData('activity')])
  .then(data => {
    allUsers = new UserRepository(data[0].users);
    allHydration = new UserHydration(data[1].hydrationData);
    allSleep = new Sleep(data[2].sleepData);
    allActivity = new UserActivity(data[3].activityData, data[0].users);
  })
  .then(() => {
    randomId = generateRandomId();
    sortByDate(allHydration.hydrationData);
    sortByDate(allSleep.sleepData);
    sortByDate(allActivity.activityData)
    renderUserInfo();
    renderHydration();
    renderSleep();
    actWeekObj = weeklyActivityObject(randomId, allActivity.activityData[0].date);
    renderActivityInfo();
  });

function sortByDate(data) {
  data.sort((a,b) => {
    const dateA = a.date;
    const dateB = b.date;
      if (dateA < dateB) {
        return 1
      };

      if (dateA > dateB) {
        return -1
      };
      
      return 0;
  });
};

function generateRandomId() {
  return Math.floor(Math.random() * allUsers.usersData.length);
};

function displayFriendData(randomId) {
  const user = allUsers.usersData.find(user => user.id === randomId);
  const friends = user.friends.map(friendId => {
    const friendObj = allUsers.usersData.find(user => user.id === friendId);
    sortByDate(allActivity.activityData);

    return {
      name: friendObj.name,
      friendsSteps: allActivity.getUserActivityById(friendObj.id)[0].numSteps,
      friendsMiles: allActivity.dailyMilesWalked(friendObj.id, allActivity.getUserActivityById(friendObj.id)[0].date),
      friendsMin: allActivity.dailyMinActive(friendObj.id, allActivity.getUserActivityById(friendObj.id)[0].date)
    };
  });
  
  friendCont.innerHTML = ' ';

  friends.forEach(friend => {
    friendCont.innerHTML += 
      `<div class="friend">
        <p><strong><u>${friend.name}</u></strong></p>
        <p>Today's Steps: ${friend.friendsSteps}</p>
        <p>Miles Walked: ${friend.friendsMiles}</p>
        <p>Minutes Active: ${friend.friendsMin}</p>
      </div>`
  });
};

function renderUserInfo() {
  const randomUser = allUsers.findUser(randomId);

  greeting.innerText = `Welcome, ${allUsers.findFirstName(randomId)}!`;
  userIdInfo.innerText = `ID: ${randomUser.id}`;
  userNameInfo.innerText = `Name: ${randomUser.name}`;
  userAddressInfo.innerText = `Address: ${randomUser.address}`;
  userEmailInfo.innerText = `Email: ${randomUser.email}`;
  userSteps.innerText = `${randomUser.dailyStepGoal}`;
  userStrideLength.innerText = `${randomUser.strideLength}`;

  displayFriendData(randomId);

  new Chart(document.getElementById('stepGoalChart'), {
    type: 'polarArea',
    data: {
      labels: ['Your Goal', 'Average User'],
      datasets: [{
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
          position: 'right',
          reverse: 'true',
        },
      },
    }
  });
};

function renderHydration() {
  let weekObject = allHydration.weeklyUserHydrationReport(allHydration.hydrationData[0].date, randomId);
  let drank = Object.values(weekObject);
  let weekDays = Object.keys(weekObject);

  dailyHydraDom.innerText = `${allHydration.userHydrationByDate(allHydration.hydrationData[0].date, randomId)}`;

  new Chart(document.getElementById("weekHydraChart"), {
    type: 'line',
    data: {
      labels: [weekDays[0],weekDays[1],weekDays[2],weekDays[3],weekDays[4],weekDays[5],weekDays[6]],
      datasets: [{ 
          data: [drank[0],drank[1],drank[2],drank[3],drank[4],drank[5],drank[6]],
          label: "Ounces Drank",
          borderColor: 'rgb(31, 155, 205)',
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
};

function renderSleep() {
  let latestDateData = allSleep.getUserSleepByID(randomId)[0];
  let weeklySleepObj = allSleep.findWeeklyHours(randomId, latestDateData.date);
  let weeklyQualityObj = allSleep.findWeeklyQuality(randomId, latestDateData.date);
  let arrayOfHours = Object.entries(weeklySleepObj);
  let arrayOfQuality = Object.entries(weeklyQualityObj);

  dailySleep.innerText = `${allSleep.findHoursByDate(randomId, latestDateData.date)}`;
  dailyQuality.innerText = `${allSleep.findQualityByDate(randomId,latestDateData.date)}`;
  averageHours.innerText = `${allSleep.calcAvgDailyHours(randomId)}`;
  averageQuality.innerText = `${allSleep.calcAvgSleepQuality(randomId)}`;

  new Chart(document.getElementById("weekSleepChart"), {
    type: 'bar',
    data: {
      labels: [arrayOfHours[0][0],arrayOfHours[1][0],arrayOfHours[2][0],arrayOfHours[3][0],arrayOfHours[4][0],arrayOfHours[5][0],arrayOfHours[6][0]],
      datasets: [{ 
          data: [arrayOfHours[0][1],arrayOfHours[1][1],arrayOfHours[2][1],arrayOfHours[3][1],arrayOfHours[4][1],arrayOfHours[5][1],arrayOfHours[6][1]],
          label: "Hours Slept",
          backgroundColor: 'rgb(141, 22, 233)',
          borderColor: "rgb(203 149 243)",
          fill: false
        },
    { 
      data: [arrayOfQuality[0][1],arrayOfQuality[1][1],arrayOfQuality[2][1],arrayOfQuality[3][1],arrayOfQuality[4][1],arrayOfQuality[5][1],arrayOfQuality[6][1]],
      label: "Sleep Quality",
      backgroundColor: 'grey',
      borderColor: "lightgrey",
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
};

function renderActivityInfo() {
  let randomUser = allUsers.findUser(randomId);
  let actWeekSteps = Object.values(actWeekObj);
  let actWeekDates = Object.keys(actWeekObj);

  dailySteps.innerText = `${allActivity.activityData[randomId -1].numSteps}`;
  dailyMilWalked.innerText = `${allActivity.dailyMilesWalked(randomId, allActivity.activityData[randomId].date)}`;
  dailyMinAct.innerText = `${allActivity.dailyMinActive(randomId, allActivity.activityData[randomId].date)}`;

  new Chart(document.getElementById("weeklyActChart"), {
    type: 'line',
    data: {
      labels: [actWeekDates[0],actWeekDates[1],actWeekDates[2],actWeekDates[3],actWeekDates[4],actWeekDates[5],actWeekDates[6]],
      datasets: [{ 
          data: [actWeekSteps[0],actWeekSteps[1],actWeekSteps[2],actWeekSteps[3],actWeekSteps[4],actWeekSteps[5],actWeekSteps[6]],
          label: "Steps Walked",
          borderColor: "rgb(57, 64, 233)",
          fill: false
        }, {
          data: [randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal,randomUser.dailyStepGoal],
          label: "Daily Step Goal",
          borderColor: "darkgray",
          fill: false,
        }
      ]    
    }
  });
};

function weeklyActivityObject(id, startDate) {
  let userActivityStat = allActivity.getUserActivityById(id);
  let dateIndex = userActivityStat.findIndex(dailyActivity => dailyActivity.date === startDate);

  let activityOfTheWeek = userActivityStat.splice(dateIndex,7).reduce((acc,obj) => {
    acc[obj.date] = obj.numSteps
    return acc
  }, {});

  return activityOfTheWeek;
};
