import {
  resolveValue,
  throwError,
  throwCustomError,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const value = 'value';
const errorMessage = 'Something went wrong';
const errorMessageRegExp = /^Something went wrong$/;
const defaultErrorMessageRegExp = /^Oops!$/;

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedValue = await resolveValue(value);
    expect(resolvedValue).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(errorMessage)).toThrow(errorMessageRegExp);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(defaultErrorMessageRegExp);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
