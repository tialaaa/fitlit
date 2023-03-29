// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';

import SomeClassYouChangeTheName from './SomeClassYouChangeTheName';
import { fetchData } from './apiCalls'
import UserHydration from './hydrationRepository';
import UserRepository from './UserRepository';

const newClass = new SomeClassYouChangeTheName();

const userInfoBody = document.getElementById('userInfoBody');
const greeting = document.getElementById('helloUser');
const stepGoal = document.getElementById('stepGoal');

let allUsers, allHydration, randomId

// => wrap the promise all in a function and have it be called on
// load

Promise.all([fetchData('users'), fetchData('hydration')])
  .then(data => {
    allUsers = new UserRepository(data[0].users) 
    allHydration = new UserHydration(data[1].hydrationData)
  })
  .then(() => {
    randomId = generateRandomId();
    renderUserInfo();
    renderHydration();
    //functionToManipulateDOM()
  })

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
    console.log(allHydration.getUserHydrationByID(userID))
  }

