import { expect } from "chai";
import hydrationRepository from "../src/hydrationRepository";

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
          }]

          hydrationRepo = new userHydration(hydrationStats)
    })
})


