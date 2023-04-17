import './css/styles.css';
import Chart from 'chart.js/auto';
import { fetchData, postHydration } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import UserActivity from './activityRepository';
import MicroModal from 'micromodal';
MicroModal.init()
// import { stepGoalGraph } from './graphFunctions'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png';

const userIdInfo = document.getElementById('userIdInfo');
const userNameInfo = document.getElementById('userNameInfo');
const userAddressInfo = document.getElementById('userAddressInfo');
const userEmailInfo = document.getElementById('userEmailInfo');
const userSteps = document.getElementById('userSteps');
const userStrideLength = document.getElementById('userStride');
const greeting = document.getElementById('helloUser');
let dailyHydraDom = document.getElementById('dailyHydration');
const dailySleep = document.getElementById('dailySleep');
const dailyQuality = document.getElementById('dailyQuality');
const averageHours = document.getElementById('averageHours');
const averageQuality = document.getElementById('averageQuality');
let friendCont = document.querySelector('.friendCont');
const dailySteps = document.getElementById('dailySteps');
const dailyMinAct = document.getElementById('dailyMinAct');
const dailyMilWalked = document.getElementById('dailyMilesWalked');
const module1 = document.getElementById('modal-1');
let hydrationStatsButton = document.getElementById('statsButton');
const modalForm = document.getElementById('modalSubmit');
const modalClose = document.getElementById('modalX');
const modalDate = document.getElementById('todays-date');

let allUsers, allHydration, randomId, allSleep, allActivity, actWeekObj, hydrationChart, sleepChart, activityChart, stepGoalChart;

window.addEventListener('load', createInitialPage());

document.addEventListener('DOMContentLoaded', (event) => {
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };

  function handleDragOver(e) {
    e.preventDefault();
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  };

  function handleDragEnter(e) {
    this.classList.add('over');
  };

  function handleDragLeave(e) {
    this.classList.remove('over');
  };
  
  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;

      this.innerHTML = e.dataTransfer.getData('text/html');
      hydrationChart.destroy();
      sleepChart.destroy();
      activityChart.destroy();
      renderHydration();
      renderSleep();
      renderActivityInfo();
    }
    
    return false;
  };

  function handleDragEndLeft(e) {
    this.style.opacity = '1';

    itemsLeft.forEach(function (item) {
      item.classList.remove('over');
    });
  };

  let itemsLeft = document.querySelectorAll('.leftContainer .dragLeft');
  itemsLeft.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEndLeft, false);
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };

  function handleDragOver(e) {
    e.preventDefault();
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  };

  function handleDragEnter(e) {
    this.classList.add('over');
  };

  function handleDragLeave(e) {
    this.classList.remove('over');
  };

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;

      this.innerHTML = e.dataTransfer.getData('text/html');
      stepGoalChart.destroy();
      renderUserInfo();
    }
    
    return false;
  };

  function handleDragEndRight(e) {
    this.style.opacity = '1';

    itemsRight.forEach(function (item) {
      item.classList.remove('over');
    });
  };

  let itemsRight = document.querySelectorAll('.rightContainer .dragRight');
  itemsRight.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEndRight, false);
  });
});

modalClose.addEventListener('click', (e) => {
  e.preventDefault();
  module1.classList.add('hidden')
})

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  if (validateFormInput()) {
    return
  } else {
    const newHydraData = {
      userID: randomId,
      date: modalDate.innerText,
      numOunces: parseInt(formData.get('ouncesDrank' ))
    };
  
    Promise.all([postHydration(newHydraData)])
      .then(() => {
        fetchData('hydration')
        .then(updatedHydra => {
          allHydration = new UserHydration(updatedHydra.hydrationData)
        })
        .then(() => {
          hydrationChart.destroy();
          sortByDate(allHydration.hydrationData);
          updateHydraDom(newHydraData.numOunces);
          renderHydration();
        })
      });
    e.target.reset();
  }
})

hydrationStatsButton.addEventListener('click', () => {
  if (validateFormInput()) {
    alert("You have already logged your data for today!");
    return;
  }
  displayModule();
})

function validateFormInput() {
  return allHydration.hydrationData.find((hydration) => {
    return hydration.date === modalDate.innerText && hydration.userID === randomId
  })
}

function createInitialPage() {
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
}

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
  stepGoalGraph('stepGoalChart', 'polarArea', randomUser, allUsers.calcAvgStepGoal(),  'rgba(57, 64, 233, 70%)', 'rgba(201, 203, 207, 70%)');
};

function renderHydration() {
  let weekObject = allHydration.weeklyUserHydrationReport(allHydration.hydrationData[0].date, randomId);
  dailyHydraDom = document.getElementById('dailyHydration');
  let drank = Object.values(weekObject);
  let weekDays = Object.keys(weekObject);

  dailyHydraDom.innerText = `${allHydration.userHydrationByDate(allHydration.hydrationData[0].date, randomId)}`;
  hydrationGraph('weekHydraChart', 'line', weekDays, drank, 'rgb(31, 155, 205')

  hydrationStatsButton = document.getElementById('statsButton');
  hydrationStatsButton.addEventListener('click', () => {
    if (validateFormInput()) {
      alert("You have already logged your data for today!");
      return;
    }
    displayModule();
  });
};

function renderSleep() {
  let latestDateData = allSleep.getUserSleepByID(randomId)[0];
  let weeklySleepObj = allSleep.findWeeklyData(randomId, latestDateData.date, 'hoursSlept');
  let weeklyQualityObj = allSleep.findWeeklyData(randomId, latestDateData.date, 'sleepQuality');
  let arrayOfHours = Object.entries(weeklySleepObj);
  let arrayOfQuality = Object.entries(weeklyQualityObj);

  dailySleep.innerText = `${allSleep.findDailyData(randomId, latestDateData.date, 'hoursSlept')}`;
  dailyQuality.innerText = `${allSleep.findDailyData(randomId,latestDateData.date, 'sleepQuality')}`;
  averageHours.innerText = `${allSleep.calcAvg(randomId, 'hoursSlept')}`;
  averageQuality.innerText = `${allSleep.calcAvg(randomId, 'sleepQuality')}`;
  sleepGraph('weekSleepChart', 'bar', arrayOfHours, arrayOfQuality);
};

function renderActivityInfo() {
  let randomUser = allUsers.findUser(randomId);
  let actWeekSteps = Object.values(actWeekObj);
  let actWeekDates = Object.keys(actWeekObj);

  dailySteps.innerText = `${allActivity.activityData[randomId -1].numSteps}`;
  dailyMilWalked.innerText = `${allActivity.dailyMilesWalked(randomId, allActivity.activityData[randomId].date)}`;
  dailyMinAct.innerText = `${allActivity.dailyMinActive(randomId, allActivity.activityData[randomId].date)}`;
  activityGraph('weeklyActChart', 'line', actWeekDates, actWeekSteps, randomUser);
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

function displayModule(event) {
  module1.classList.remove('hidden');
}

function updateHydraDom(inputData) {
  dailyHydraDom.innerText = `${inputData}`;
  module1.classList.add('hidden');
}

function hydrationGraph(elementById, typeOfChart, weekDay, ounces, borderColor) {
  hydrationChart = new Chart(document.getElementById(elementById), {
      type: typeOfChart,
      data: {
          labels: [weekDay[0],weekDay[1],weekDay[2],weekDay[3],weekDay[4],weekDay[5],weekDay[6]],
          datasets: [{
              data: [ounces[0], ounces[1],ounces[2],ounces[3],ounces[4],ounces[5],ounces[6]],
              label: "Ounces Drank",
              borderColor: borderColor,
              fill: false
          }]
      },
      options: {
          title: {
              display: true,
              text: 'Ounces of water drank per day!'
          }
      }
  });
  return hydrationChart;
};

function sleepGraph(elementById, typeOfChart, arrayOfHours, arrayOfQuality) {
  sleepChart = new Chart(document.getElementById(elementById), {
      type: typeOfChart,
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
  return sleepChart;
}

function activityGraph(elementById, typeOfChart, actWeekDates, actWeekSteps, randomUser) {
  activityChart = new Chart(document.getElementById(elementById), {
      type: typeOfChart,
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
  return activityChart;
}

function stepGoalGraph(elementById, typeOfChart, randomUser, allUsersAvgGoal, color1, color2) {
  stepGoalChart = new Chart(document.getElementById(elementById), {
      type: typeOfChart,
      data: {
        labels: [`Your Goal: ${randomUser.dailyStepGoal}`, `Average User: ${allUsersAvgGoal}`],
        datasets: [{
            data: [randomUser.dailyStepGoal, allUsersAvgGoal],
            backgroundColor: [
                color1,
                color2
            ]
        }],
      },
      options: {
        aspectRatio: 2,
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
            tooltip: {
                callbacks: {
                    title: function() {
                      return 'Step Count'
                    }
                }
            }
          }
      }
  });
  return stepGoalChart;
}

// function reformatDateInput(currentDate) {
//   let correctedDate = currentDate.split('-')
//   return correctedDate.join('/')
// //   let correctedDate = currentDate.split('-')
// //   let year = correctedDate.shift()
// //   correctedDate.push(year)
// //   return correctedDate.join('/')
// }