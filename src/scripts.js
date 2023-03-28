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

const arrayOfUsers = Object.values(userData)[0];
const userRepo = new UserRepository(arrayOfUsers);
const randomId = Math.floor(Math.random() * userRepo.usersData.length) + 1;
const randomUser = userRepo.findUser(randomId);

userInfoBody.innerHTML = `ID: ${randomUser.id}<br>
  Name: ${randomUser.name}<br>
  Address: ${randomUser.address}<br>
  Email: ${randomUser.email}<br>
  Stride Length: ${randomUser.strideLength}<br>
  Daily Step Goal: ${randomUser.dailyStepGoal}<br>
  `
  
greeting.innerText = `Welcome, ${userRepo.findFirstName(randomId)}!`

stepGoal.innerText = `Your step goal: ${randomUser.dailyStepGoal} versus Average step goal: ${userRepo.calcAvgStepGoal()}`