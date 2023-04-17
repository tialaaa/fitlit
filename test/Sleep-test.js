import { expect } from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', () => {
  let sleepRepo;
  let sleepStats;

  beforeEach(() => {
    sleepStats = [
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
      }];

      sleepRepo = new Sleep(sleepStats);
  });

  it('should be a function', function () {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep class', () => {
    expect(sleepRepo).to.be.an.instanceOf(Sleep);
  });

  it('should hold an array of user data objects', () => {
    expect(sleepRepo.sleepData).to.deep.equal(sleepStats);
  });
  
  it('should filter all data to one specific user\'s data based the given ID number', () => {
    expect(sleepRepo.getUserSleepByID(1)).to.deep.equal([
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
        }
    ])
  });

  it('should return an empty array if the given ID number is not an exact match', () => {
    expect(sleepRepo.getUserSleepByID('9')).to.be.empty;
  });

  it('should calculate the average number of hours slept per day for a user', () => {
    expect(sleepRepo.calcAvg(1, 'hoursSlept')).to.equal(7.2);
  });

  it('should calculate the all-time average sleep quality for a user', () => {
    expect(sleepRepo.calcAvg(1, 'sleepQuality')).to.equal(3.2);
  });

  it('should return NaN if the ID number is not an exact match for calcAvg method', () => {
    expect(sleepRepo.calcAvg(3, 'sleepQuality')).to.be.NaN;
  });

  it('should return NaN if the type is not an exact match for calcAvg method', () => {
    expect(sleepRepo.calcAvg(1, 'sleep')).to.be.NaN;
  });

  it('should return how many hours a user slept for a specific day', () => {
    expect(sleepRepo.findDailyData(1, "2023/03/26", 'hoursSlept')).to.equal(9.7);
  });

  it('should return the sleep quality for a user for a specific day', () => {
    expect(sleepRepo.findDailyData(9, "2023/03/26", 'sleepQuality')).to.equal(1);
  });

  it('should return undefined if the ID number is not an exact match for findDailyData method', () => {
    expect(sleepRepo.findDailyData('1',  "2023/03/26", 'sleepQuality')).to.be.undefined;
  });

  it('should return undefined if the date is not an exact match for findDailyData method', () => {
    expect(sleepRepo.findDailyData(1,  "03/26/2023", 'sleepQuality')).to.be.undefined;
  });

  it('should return undefined if the type is not an exact match for findDailyData method', () => {
    expect(sleepRepo.findDailyData(1, "2023/03/26", 'sleep')).to.be.undefined;
  });

  it('should return the hours slept each day over the course of 7 days', () => {
    expect(sleepRepo.findWeeklyData(1, "2023/03/24", 'hoursSlept')).to.deep.equal({
      '2023/03/24': 9.6,
      '2023/03/25': 8.4,
      '2023/03/26': 9.7,
      '2023/03/27': 4.7,
      '2023/03/28': 8,
      '2023/03/29': 4.2,
      '2023/03/30': 4.1
    })
  });

  it('should return the sleep quality by day over the course of 7 days', () => {
    expect(sleepRepo.findWeeklyData(1, "2023/03/25", 'sleepQuality')).to.deep.equal({
        '2023/03/25': 3.5,
        '2023/03/26': 4.7,
        '2023/03/27': 3,
        '2023/03/28': 3.1,
        '2023/03/29': 1.2,
        '2023/03/30': 3.9,
        '2023/03/31': 1.6
    })
  });

  it('should return undefined if the ID number is not an exact match for findWeeklyData method', () => {
    expect(sleepRepo.findWeeklyData('1', "2023/03/25", 'sleepQuality')).to.be.undefined;
  });

  it('should return undefined if the date is not an exact match for findWeeklyData method', () => {
    expect(sleepRepo.findWeeklyData(1,  "03/26/2023", 'sleepQuality')).to.be.undefined;
  });

  it('should return undefined if the type is not an exact match for findWeeklyData method', () => {
    expect(sleepRepo.findWeeklyData(1, "2023/03/28", 'sleep')).to.be.undefined;
  });
})