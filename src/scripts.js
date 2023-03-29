// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

// import userData from './data/users';
import { userData, sleepData, hydrationData, activityData } from '/src/apiCalls';
// console.log("User Data:", userData);

import SomeClassYouChangeTheName from './SomeClassYouChangeTheName';
import UserRepository from './UserRepository';

const newClass = new SomeClassYouChangeTheName();


const userInfoBody = document.getElementById('userInfoBody');
const greeting = document.getElementById('helloUser');
const stepGoal = document.getElementById('stepGoal');

// const userRepo = new UserRepository(userData);
// const randomId = Math.floor(Math.random() * userRepo.usersData.length) + 1;
// const randomUser = userRepo.findUser(randomId);

import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';

const userID = 33
let allUsers, allHydration

// => wrap the promise all in a function and have it be called on
// load

Promise.all([fetchData('users'), fetchData('hydration')])
  .then(data => {
    allUsers = data[0].users
    console.log('USER', data[0])
    console.log('wohoo', data[1])
    allHydration = new UserHydration(data[1].hydrationData)
    console.log('usersARRAY', allUsers)
    console.log('hydrationARRAY', allHydration)
  })
  .then(() => {
    renderHydration()
    //renderUserInfo()
    //functionToManipulateDOM()
  })

  function renderHydration() {
    console.log(allHydration.getUserHydrationByID(userID))
  }

  // create a second then for a render function

// userInfoBody.innerHTML = `ID: ${randomUser.id}<br>
//   Name: ${randomUser.name}<br>
//   Address: ${randomUser.address}<br>
//   Email: ${randomUser.email}<br>
//   Stride Length: ${randomUser.strideLength}<br>
//   Daily Step Goal: ${randomUser.dailyStepGoal}<br>
//   `

// greeting.innerText = `Welcome, ${userRepo.findFirstName(randomId)}!`

// stepGoal.innerText = `Your step goal: ${randomUser.dailyStepGoal} versus Average step goal: ${userRepo.calcAvgStepGoal()}`