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
    
}

module.exports = UserHydration