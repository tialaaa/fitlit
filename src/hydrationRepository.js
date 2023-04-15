  class UserHydration {
    constructor(hydrationData) {
        this.hydrationData = hydrationData
    }

    getUserHydrationByID = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id);

    userHydrationAllTime = (id) => {
        let userHydrationData = this.getUserHydrationByID(id);
        
        if (!userHydrationData.length) {
            return undefined;
        };

        let hydrationAverage = userHydrationData.reduce((acc, currObj) => {
            acc += currObj.numOunces / userHydrationData.length;
            return acc;
        }, 0)
        return Math.round(hydrationAverage);
    }

    userHydrationByDate = (date, id) => {
        let userHydrationData = this.getUserHydrationByID(id);
        let dateValidation = date.split('/');
        const filteredByDate = userHydrationData.find(dailyHydration => dailyHydration.date === date);

        if (!userHydrationData.length || dateValidation[0].length !== 4 || dateValidation[1].length !== 2 || dateValidation[2].length !== 2) {
            return undefined;
        };

        return filteredByDate.numOunces;
    }

    weeklyUserHydrationReport = (startDate, id) => {
        let userHydrationData = this.getUserHydrationByID(id);
        let dateIndex = userHydrationData.findIndex(dailyHydration => dailyHydration.date === startDate);
        
        if (!userHydrationData.length || dateIndex === -1) {
            return undefined;
        }

        return userHydrationData.splice(dateIndex, 7).reduce((acc,obj) => {
            acc[obj.date] = obj.numOunces;
            return acc;
        }, {});
    }
}

module.exports = UserHydration