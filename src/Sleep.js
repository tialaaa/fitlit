class Sleep {
  constructor(arrayOfSleepData) {
    this.sleepData = arrayOfSleepData
  }

  getUserSleepByID = (id) => this.sleepData.filter(sleepObj => sleepObj.userID === id);

  calcAvg(id, type) {
    let userSleepData = this.getUserSleepByID(id);

    let total = userSleepData.reduce((acc, currObj) => {
      return acc += currObj[type]
    }, 0);

    return parseFloat((total / userSleepData.length).toFixed(1));
  };

  findDailyData(id, date, type) {
    let userSleepData = this.getUserSleepByID(id);
    let dateValidation = date.split('/');

    if (!userSleepData.length || dateValidation[0].length !== 4 || dateValidation[1].length !== 2 || dateValidation[2].length !== 2) {
      return undefined
    };

    return this.getUserSleepByID(id).find((day) => day.date === date)[type];
  };

  findWeeklyData(id, startDate, type) {
    let userSleepData = this.getUserSleepByID(id);
    let dateIndex = userSleepData.findIndex(dailySleep => dailySleep.date === startDate);

    let weeklyData = userSleepData.splice(dateIndex, 7).reduce((acc,obj) => {
        acc[obj.date] = obj[type]
        return acc;
    }, {});

    if (!userSleepData.length || dateIndex === -1 || Object.values(weeklyData).includes(undefined)) {
      return undefined
    };

    return weeklyData;
  };
}

export default Sleep;