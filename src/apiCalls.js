// Your fetch requests will live here!
export { userData, sleepData, hydrationData, activityData }

console.log('I will be a fetch request!')

let userData =
fetch("https://fitlit-api.herokuapp.com/api/v1/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Object.values(data)[0];
    })
    .catch(err => console.log(err))

let sleepData = 
fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Object.values(data)[0];
    })
    .catch(err => console.log(err))

let hydrationData = 
fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Object.values(data)[0];
    })
    .catch(err => console.log(err))

let activityData = 
fetch("https://fitlit-api.herokuapp.com/api/v1/activity")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        Object.values(data)[0];
    })
    .catch(err => console.log(err))

