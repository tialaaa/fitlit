class Sleep {
  constructor(arrayOfSleepData) {
    this.sleepData = arrayOfSleepData
  }

  getUserSleepByID = (id) => this.sleepData.filter(sleepObj => sleepObj.userID === id);

  calcAvgDailyHours(id) {
    let userSleepData = this.getUserSleepByID(id);

    let hoursAverage = userSleepData.reduce((acc, currObj) => {
      return acc += currObj.hoursSlept
    }, 0);

    return Math.round(hoursAverage / userSleepData.length);
  };

  calcAvgSleepQuality(id) {
    let userSleepData = this.getUserSleepByID(id);

    let qualityAverage = userSleepData.reduce((acc, currObj) => {
      return acc += currObj.sleepQuality
    }, 0);

    return Math.round(qualityAverage / userSleepData.length);
  };

  findHoursByDate(id, date) {
    let userSleepData = this.getUserSleepByID(id);

    let dateFound = userSleepData.find((day) => {
      return day.date === date;
    });

    return dateFound.hoursSlept;
  };

  findQualityByDate(id, date) {
    let userSleepData = this.getUserSleepByID(id);

    let dateFound = userSleepData.find((day) => {
      return day.date === date;
    });

    return dateFound.sleepQuality;
  };

  findWeeklyHours(id, startDate) {
    let userSleepData = this.getUserSleepByID(id);

    let dateIndex = userSleepData.findIndex(dailySleep => dailySleep.date === startDate);
        
    let weeklyHours = userSleepData.splice(dateIndex, 7).reduce((acc,obj) => {
        acc[obj.date] = obj.hoursSlept
        return acc
    }, {});

    return weeklyHours;
  };

  findWeeklyQuality(id, startDate) {
    let userSleepData = this.getUserSleepByID(id);

    let dateIndex = userSleepData.findIndex(dailySleep => dailySleep.date === startDate);
        
    let weeklyQuality = userSleepData.splice(dateIndex, 7).reduce((acc,obj) => {
        acc[obj.date] = obj.sleepQuality
        return acc
    }, {});

    return weeklyQuality;
  };
}

module.exports = Sleep;
// export default Sleep;