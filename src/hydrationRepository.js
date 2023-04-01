  class UserHydration {
    constructor(hydrationData) {
        this.hydrationData = hydrationData
    }

    getUserHydrationByID = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id)

    userHydrationAllTime = (id) => {
        let userHydrationData = this.getUserHydrationByID(id)
        let hydrationAverage = userHydrationData.reduce((acc, currObj) => {
            acc += currObj.numOunces / userHydrationData.length
            return acc
        }, 0)
        return Math.round(hydrationAverage)
    }

    userHydrationByDate = (date, id) => {
        let userHydrationData = this.getUserHydrationByID(id)
        const filteredByDate = userHydrationData.find(dailyHydration => dailyHydration.date === date)
        return filteredByDate.numOunces
    }
    weeklyUserHydrationReport = (startDate, id) => {
        let userHydrationData = this.getUserHydrationByID(id)
        let dateIndex = userHydrationData.findIndex(dailyHydration => dailyHydration.date === startDate)
        
        let hydrationOfWeek = userHydrationData.splice(dateIndex, 7).reduce((acc,obj) => {
            acc[obj.date] = obj.numOunces
            return acc
        }, {})
        return hydrationOfWeek
        
    }
}

module.exports = UserHydration