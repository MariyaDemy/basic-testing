import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedListToGenerate = {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    };
    expect(generateLinkedList([1, 2, 3])).toStrictEqual(linkedListToGenerate);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  });
});
