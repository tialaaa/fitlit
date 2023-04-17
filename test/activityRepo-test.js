import { expect } from 'chai';
import UserActivity from "../src/activityRepository";

describe('UserActivity', () => {
    let activityStats, userStats, activityRepo
    
    beforeEach(() => {
        userStats = [{
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
          },
          {
            "id": 4,
            "name": "Evie Satterfield",
            "address": "1378 Renner Island, Port Lincoln NE 06237-3602",
            "email": "Adan66@yahoo.com",
            "strideLength": 3.9,
            "dailyStepGoal": 4000,
            "friends": [
              21,
              32,
              8
            ]
          },
          {
            "id": 5,
            "name": "Brycen Rutherford",
            "address": "0770 Keeley Square, West Keyon SD 73400-6577",
            "email": "Jerald55@yahoo.com",
            "strideLength": 3.3,
            "dailyStepGoal": 10000,
            "friends": [
              5,
              46
            ]
          }]
        activityStats = [
            {
            "userID": 1,
            "date": "2023/03/24",
            "numSteps": 7362,
            "minutesActive": 261,
            "flightsOfStairs": 26
            },
            {
            "userID": 2,
            "date": "2023/03/24",
            "numSteps": 3049,
            "minutesActive": 125,
            "flightsOfStairs": 43
            },
            {
            "userID": 3,
            "date": "2023/03/24",
            "numSteps": 12970,
            "minutesActive": 282,
            "flightsOfStairs": 38
            },
            {
            "userID": 4,
            "date": "2023/03/24",
            "numSteps": 8934,
            "minutesActive": 294,
            "flightsOfStairs": 19
        }]
        activityRepo = new UserActivity(activityStats, userStats)
    })

    it('should be a function', () => {
        expect(UserActivity).to.be.a('function');
    });

    it('should be a instance of user activity', () => {
      expect(activityRepo).to.be.an.instanceOf(UserActivity);
    });

    it('should be able to store data', () => {
      expect(activityRepo.activityData).to.deep.equal(activityStats);
      expect(activityRepo.userData).to.deep.equal(userStats);
    });

    it('should be able to calculate the miles a user has walked', () => {
      expect(activityRepo.dailyMilesWalked(1, '2023/03/24')).to.equal(5.6);
    });

    it('should not be able to calculate the miles a user has walked if wrong date is provided', () => {
      expect(activityRepo.dailyMilesWalked(1, '2023/03/25')).to.be.undefined;
    });

    it('should not be able to calculate miles walked if date provided is in incorrect order', () => {
      expect(activityRepo.dailyMilesWalked(1, "03/24/2023")).to.be.undefined;
    });

    it('should be able to tell the user minutes active by specified date', () => {
      expect(activityRepo.dailyMinActive(1, '2023/03/24')).to.equal(261);
    });

    it('should not be able to tell the user minutes active when provided a wrong date', () => {
      expect(activityRepo.dailyMinActive(1, '2023/03/25')).to.be.undefined;
    });

    it('should not be able to calculate miles walked if date provided is in incorrect order', () => {
      expect(activityRepo.dailyMinActive(1, "03/24/2023")).to.be.undefined;
    });

    it('should not be able to calculate miles walked if both id and date are not provided', () => {
      expect(activityRepo.dailyMinActive(1)).to.be.undefined;
    });

    it('should be able to tell if the user has did not reach step goal', () => {
      expect(activityRepo.stepGoalReached(2, '2023/03/24')).to.equal(false);
    });

    it('should be able to tell if the user reached step goal', () => {
      expect(activityRepo.stepGoalReached(1, '2023/03/24')).to.equal(true);
    });

    it('should not be able to tell the user step goals when provided a wrong date', () => {
      expect(activityRepo.stepGoalReached(1, '2023/03/25')).to.equal(false);
    });  

    it('should not be able to calculate miles walked if date provided is in incorrect order', () => {
      expect(activityRepo.stepGoalReached(1, "03/24/2023")).to.equal(false);
    });

    it('should not be able to calculate miles walked if both id and date are not provided', () => {
      expect(activityRepo.stepGoalReached(1)).to.equal(false);
    });
})
