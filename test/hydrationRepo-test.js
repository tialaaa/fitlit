import { expect } from "chai";
import UserHydration from "../src/hydrationRepository";

describe("Hydration Repository", () => {
    let hydrationStats;
    let hydrationRepo;

    beforeEach(() => {
      hydrationStats = [{
          "userID": 33,
          "date": "2023/03/24",
          "numOunces": 95
          }, 
          {
          "userID": 33,
          "date": "2023/03/25",
          "numOunces": 49
        },
        {
          "userID": 33,
          "date": "2023/03/26",
          "numOunces": 81
        },
        {
          "userID": 33,
          "date": "2023/03/27",
          "numOunces": 86
        },
        {
          "userID": 33,
          "date": "2023/03/28",
          "numOunces": 33
        },
        {
          "userID": 33,
          "date": "2023/03/29",
          "numOunces": 54
        },
        {
          "userID": 33,
          "date": "2023/03/30",
          "numOunces": 62
        },
        {
          "userID": 32,
          "date": "2023/03/30",
          "numOunces": 62
        },
        {
          "userID": 33,
          "date": "2023/03/31",
          "numOunces": 53
        },
        {
          "userID": 33,
          "date": "2023/04/01",
          "numOunces": 41
        }];

        hydrationRepo = new UserHydration(hydrationStats)
    })

    it('should be a function', function() {
      expect(UserHydration).to.be.a('function')
    });

    it('should be an instance of UserHydration', () => {
      expect(hydrationRepo).to.be.an.instanceOf(UserHydration)
    })

    it('should return user\'s hydration data when providing an ID number', () => {
      expect(hydrationRepo.getUserHydrationByID(32)).to.deep.equal([{
          "userID": 32,
          "date": "2023/03/30",
          "numOunces": 62
        }])
    })

    it('should return all of the user\'s hydration data', () => {
      expect(hydrationRepo.getUserHydrationByID(33).length).to.equal(9)
    })

    it('should return an empty array if the given ID number is not an exact match', () => {
      expect(hydrationRepo.getUserHydrationByID('32')).to.be.empty;
    })

    it('should return user\'s all time hydration average', () => {
      expect(hydrationRepo.userHydrationAllTime(33)).to.equal(62)
    })

    it('should return undefined if the given ID number is not an exact match', () => {
      expect(hydrationRepo.userHydrationAllTime(34)).to.be.undefined;
    })

    it('should return a user\'s ounces drank for given a date', () => {
      expect(hydrationRepo.userHydrationByDate("2023/03/29", 33)).to.equal(54)
    })

    it('should return undefined if the given ID number is not an exact match for userHydrationByDate method', () => {
      expect(hydrationRepo.userHydrationByDate("2023/03/29", '33')).to.be.undefined;
    })

    it('should return undefined if the date is not an exact match for userHydrationByDate method', () => {
      expect(hydrationRepo.userHydrationByDate("03/29/2023", 33)).to.be.undefined;
    })

    it('should be able to return a weeks worth of hydration data', () => {
      expect(hydrationRepo.weeklyUserHydrationReport("2023/03/24", 33)).to.deep.equal({
        '2023/03/24': 95,
        '2023/03/25': 49,
        '2023/03/26': 81,
        '2023/03/27': 86,
        '2023/03/28': 33,
        '2023/03/29': 54,
        '2023/03/30': 62
      })
    })

    it('should return undefined if the ID number is not an exact match for weekly method', () => {
      expect(hydrationRepo.weeklyUserHydrationReport("2023/03/24", '33')).to.be.undefined
    });
  
    it('should return undefined if the date is not an exact match for weekly method', () => {
      expect(hydrationRepo.weeklyUserHydrationReport("03/24/2023", 33)).to.be.undefined
    });
})


