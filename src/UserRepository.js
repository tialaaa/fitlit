class UserRepository {
    constructor(id, name, address, email, strideLength, dailyStepGoal, friends) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.strideLength = strideLength;
        this.dailyStepGoal = dailyStepGoal;
        this.friends = friends;
    }
}

module.exports = UserRepository;