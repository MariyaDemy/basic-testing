import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 52, b: 48, action: Action.Add })).toBe(100);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 52, action: Action.Subtract })).toBe(
      48,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 11, action: Action.Multiply })).toBe(
      121,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 100, b: 10, action: Action.Divide })).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 10, action: Action.Exponentiate })).toBe(
      1024,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: '52', b: 48, action: Action.Add })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 100, b: 0, action: 'Unknown magic action' }),
    ).toBe(null);
  });
});
