import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 52, b: 48, action: Action.Add, expected: 100 },
  { a: 100, b: 52, action: Action.Subtract, expected: 48 },
  { a: 11, b: 11, action: Action.Multiply, expected: 121 },
  { a: 100, b: 10, action: Action.Divide, expected: 10 },
  { a: 2, b: 10, action: Action.Exponentiate, expected: 1024 },
  { a: '52', b: 48, action: Action.Add, expected: null },
  { a: 100, b: 0, action: 'Unknown magic action', expected: null },
];

describe('simpleCalculator', () => {
  // using Jest table tests API to test all cases above
  it.each(testCases)(
    'simpleCalculator($a, $b, $action) returns $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
