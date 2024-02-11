import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const initialBalanceValue = 350;
const moreThanBalanceValue = 400;
const fetchedBalance = 50;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialBalanceValue);
    expect(account.getBalance()).toBe(initialBalanceValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(initialBalanceValue);
    expect(() => account.withdraw(moreThanBalanceValue)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const fromAccount = getBankAccount(initialBalanceValue);
    const toAccount = getBankAccount(initialBalanceValue);
    expect(() => fromAccount.transfer(moreThanBalanceValue, toAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const fromAccount = getBankAccount(initialBalanceValue);
    expect(() =>
      fromAccount.transfer(moreThanBalanceValue, fromAccount),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(initialBalanceValue);
    account.deposit(100);
    expect(account.getBalance()).toBe(450);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(initialBalanceValue);
    account.withdraw(100);
    expect(account.getBalance()).toBe(250);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(initialBalanceValue);
    const toAccount = getBankAccount(initialBalanceValue);
    fromAccount.transfer(100, toAccount);
    expect(fromAccount.getBalance()).toBe(250);
    expect(toAccount.getBalance()).toBe(450);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn().mockReturnValue(1);

    const account = getBankAccount(initialBalanceValue);
    const balance = await account.fetchBalance();

    expect(balance).not.toBeNull();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(initialBalanceValue);

    account.fetchBalance = jest.fn().mockResolvedValue(fetchedBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(fetchedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialBalanceValue);

    account.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
