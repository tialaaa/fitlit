import { expect } from "chai";
import UserHydration from "../src/hydrationRepository";


describe("Hydration Repository", () => {
    let hydrationStats
    let hydrationRepo

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

    it('it should be a function', function() {
        expect(UserHydration).to.be.a('function')
    });

    it('should be an instance of UserHydration', () => {
        expect(hydrationRepo).to.be.an.instanceOf(UserHydration)
    })

    it.skip('should return users hydration data when providing id', () => {
        hydrationRepo.userHydrationAllTime(33)
        expect(hydrationRepo.getUserHydrationByID(32)).to.deep.equal([{
            "userID": 32,
            "date": "2023/03/30",
            "numOunces": 62
          }])
        expect(hydrationRepo.getUserHydrationByID(33).length).to.equal(7)
    })

    it('should return users hydration average', () => {
        expect(hydrationRepo. userHydrationAllTime(33)).to.equal(62)
    })
    it('Should return a users ounces drank given a day', () => {
      expect(hydrationRepo.userHydrationByDate("2023/03/29", 33)).to.equal(54)
    })
    it('Should be able to return a weeks worth of hydration data', () => {
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







    // it('should take in a users daily amount of ounces drank', () => {
    //     expect(UserHydration.)
    // })

})


