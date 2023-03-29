import { expect } from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', () => {
  let sleepData;

  beforeEach(() => {
    sleepData = new Sleep([
      {
      "userID": 1,
      "date": "2023/03/24",
      "hoursSlept": 9.6,
      "sleepQuality": 4.3
      },
      {
      "userID": 1,
      "date": "2023/03/25",
      "hoursSlept": 8.4,
      "sleepQuality": 3.5
      },
      {
      "userID": 1,
      "date": "2023/03/26",
      "hoursSlept": 9.7,
      "sleepQuality": 4.7
      },
      {
      "userID": 1,
      "date": "2023/03/27",
      "hoursSlept": 4.7,
      "sleepQuality": 3
      },
      {
      "userID": 1,
      "date": "2023/03/28",
      "hoursSlept": 8,
      "sleepQuality": 3.1
      },
      {
      "userID": 1,
      "date": "2023/03/29",
      "hoursSlept": 4.2,
      "sleepQuality": 1.2
      },
      {
      "userID": 1,
      "date": "2023/03/30",
      "hoursSlept": 4.1,
      "sleepQuality": 3.9
      },
      {
      "userID": 1,
      "date": "2023/03/31",
      "hoursSlept": 9.2,
      "sleepQuality": 1.6
      },
      {
      "userID": 9,
      "date": "2023/03/24",
      "hoursSlept": 4.8,
      "sleepQuality": 2.5
      },
      {
      "userID": 9,
      "date": "2023/03/25",
      "hoursSlept": 7.2,
      "sleepQuality": 2.2
      },
      {
      "userID": 9,
      "date": "2023/03/26",
      "hoursSlept": 7.2,
      "sleepQuality": 1
      },
      {
      "userID": 9,
      "date": "2023/03/27",
      "hoursSlept": 4,
      "sleepQuality": 3.1
      },
      {
      "userID": 9,
      "date": "2023/03/28",
      "hoursSlept": 6.5,
      "sleepQuality": 1.4
      },
      {
      "userID": 9,
      "date": "2023/03/29",
      "hoursSlept": 5.3,
      "sleepQuality": 4.7
      },
      {
      "userID": 9,
      "date": "2023/04/01",
      "hoursSlept": 10,
      "sleepQuality": 2.4
      }])
  })

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep class', () => {
    expect(sleepData).to.be.an.instanceOf(Sleep);
  });
})