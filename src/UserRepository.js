class UserRepository {
    constructor(arrayOfUsers) {
        this.usersData = arrayOfUsers;
    }

    findUser(id) {
        return this.usersData.find(user => {
            return user.id === id;
        })
    }

    calcAvgStepGoal() {
        const sum = this.usersData.reduce((acc, currentUser) => {
            acc += currentUser.dailyStepGoal;
            return acc;
        }, 0)
        return Math.floor(sum / this.usersData.length);
    }

    findFirstName(id) {
        const foundUser = this.usersData.find(user => {
            return user.id === id;
        })
        return foundUser.name.split(' ')[0];
    }
}

module.exports = UserRepository;