import { expect } from 'chai';
import UserRepository from '../src/UserRepository';

describe('User Repository', () => {
  let user;
  beforeEach(() => {
    user = new UserRepository(1, "Trystan Gorczany", "9484 Lucas Flat, West Kittymouth WA 67504", "Taurean_Pollich31@gmail.com", 4, 7000, [5, 43, 46, 11]);
  });
  
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(user).to.be.an.instanceOf(UserRepository);
  });

  it('should have a property with key of id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a property with key of name', () => {
    expect(user.name).to.equal("Trystan Gorczany");
  });

  it('should have a property with key of address', () => {
    expect(user.address).to.equal("9484 Lucas Flat, West Kittymouth WA 67504");
  });

  it('should have a property with key of email', () => {
    expect(user.email).to.equal("Taurean_Pollich31@gmail.com");
  });

  it('should have a property with key of strideLength', () => {
    expect(user.strideLength).to.equal(4);
  });

  it('should have a property with key of dailyStepGoal', () => {
    expect(user.dailyStepGoal).to.equal(7000);
  });

  it('should have a property with key of friends', () => {
    expect(user.friends).to.deep.equal([5, 43, 46, 11]);
  });

  
});