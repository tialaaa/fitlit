class UserActivity {
    constructor(activityData, userData) {
        this.activityData = activityData
        this.userData = userData
    }

    getUserActivityById = (id) => this.activityData.filter(data => data.userID === id)
    getUserInfoById = (id) => this.userData.filter(data => data.id === id)

    dailyMilesWalked(id, date) {
        let userActivityData = this.getUserActivityById(id)
        let userInfoData = this.getUserInfoById(id)
        if(userActivityData[0].date === date) {
            let milesWalked = userActivityData[0].numSteps / (5280 / userInfoData[0].strideLength)
            let roundedMilesWalked = parseFloat(milesWalked.toFixed(1))
            return roundedMilesWalked
            }
        }

    dailyMinActive(id, date) {
        let userActivityData = this.getUserActivityById(id)
        if(userActivityData[0].date === date) {
            return userActivityData[0].minutesActive
        }
    }
    
    stepGoalReached(id, date) {
        let userActivityData = this.getUserActivityById(id)
        let userInfoData = this.getUserInfoById(id)
        console.log(userActivityData[0].numSteps, userInfoData[0].dailyStepGoal, 'FIRING')
        if(userActivityData[0].numSteps > userInfoData[0].dailyStepGoal && userActivityData[0].date === date) {
            return true
        } else {
            return false
        }
    }
}


module.exports = UserActivity






