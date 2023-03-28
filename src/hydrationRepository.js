class UserHydration {
    constructor(hydrationData) {
        this.hydrationData = hydrationData
    }

    getUserHydrationByID = (id) => this.hydrationData.filter(hydrationObj => hydrationObj.userID === id)
    
}

module.exports = UserHydration