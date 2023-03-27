class UserRepository {
    constructor(arrayOfUsers) {
        this.usersData = arrayOfUsers;
    }

    findUser(id) {
        return this.usersData.find(user => {
            return user.id === id;
        })
    }
}

module.exports = UserRepository;