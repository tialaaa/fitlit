import { Chart } from "chart.js";

function stepGoalChart(elementById, typeOfChart, randomUser, allUsersAvgGoal, color1, color2) {
    new Chart(document.getElementById(elementById), {
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
}

// function hydrationGraph(elementById, typeOfChart, weekDay, ounces, borderColor) {
//     myChart = new Chart(document.getElementById(elementById), {
//         type: typeOfChart,
//         data: {
//             labels: [weekDay[0],weekDay[1],weekDay[2],weekDay[3],weekDay[4],weekDay[5],weekDay[6]],
//             datasets: [{
//                 data: [ounces[0], ounces[1],ounces[2],ounces[3],ounces[4],ounces[5],ounces[6]],
//                 label: "Ounces Drank",
//                 borderColor: borderColor,
//                 fill: false
//             }]
//         },
//         options: {
//             title: {
//                 display: true,
//                 text: 'Ounces of water drank per day!'
//             }
//         }
//     });

//     return myChart;
// };

function sleepGraph(elementById, typeOfChart, arrayOfHours, arrayOfQuality) {
    new Chart(document.getElementById(elementById), {
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
}


function activityChart(elementById, typeOfChart, actWeekDates, actWeekSteps, randomUser) {
    new Chart(document.getElementById(elementById), {
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
}

export { stepGoalChart, sleepGraph, activityChart }