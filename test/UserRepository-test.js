import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  let users;
  beforeEach(() => {
    users = new UserRepository([{
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    },
    {
      "id": 2,
      "name": "Tyreek VonRueden",
      "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
      "email": "Nicolette_Halvorson43@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 9000,
      "friends": [
        13,
        19,
        3
      ]
    },
    {
      "id": 3,
      "name": "Colt Rohan",
      "address": "48010 Balistreri Harbor, Cleobury IN 43317",
      "email": "Wilford.Barton@gmail.com",
      "strideLength": 2.7,
      "dailyStepGoal": 3000,
      "friends": [
        31,
        16,
        15,
        7
      ]
    }]);
  });
  
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(users).to.be.an.instanceOf(UserRepository);
  });

  it('should hold an array of user data objects', () => {
    expect(users.usersData).to.deep.equal([{
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    },
    {
      "id": 2,
      "name": "Tyreek VonRueden",
      "address": "623 Koelpin Skyway, Lake Luigichester MN 77576-1678",
      "email": "Nicolette_Halvorson43@yahoo.com",
      "strideLength": 4.5,
      "dailyStepGoal": 9000,
      "friends": [
        13,
        19,
        3
      ]
    },
    {
      "id": 3,
      "name": "Colt Rohan",
      "address": "48010 Balistreri Harbor, Cleobury IN 43317",
      "email": "Wilford.Barton@gmail.com",
      "strideLength": 2.7,
      "dailyStepGoal": 3000,
      "friends": [
        31,
        16,
        15,
        7
      ]
    }]);
  });

  it('should find user data given an ID number', () => {
    expect(users.findUser(1)).to.deep.equal({
      "id": 1,
      "name": "Trystan Gorczany",
      "address": "9484 Lucas Flat, West Kittymouth WA 67504",
      "email": "Taurean_Pollich31@gmail.com",
      "strideLength": 4,
      "dailyStepGoal": 7000,
      "friends": [
        5,
        43,
        46,
        11
      ]
    });
  });

  it('should only return user data if the ID is included in the array', () => {
    expect(users.findUser(18)).to.be.undefined;
  });

  it('should only return user data if the ID is an exact match', () => {
    expect(users.findUser('1')).to.be.undefined;
  });

  it('should calculate average step goal amongst users', () => {
    expect(users.calcAvgStepGoal()).to.equal(6333);
  });

  it('should return user\'s first name based on their ID number', () => {
    expect(users.findFirstName(1)).to.equal("Trystan");
  });

  it('should only return user\'s first name if the ID is an exact match', () => {
    expect(users.findFirstName('3')).to.be.undefined;
  });
});