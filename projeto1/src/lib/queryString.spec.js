import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Walace',
      profession: 'developer',
    };
    expect(queryString(obj)).toBe('name=Walace&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Walace',
      abilities: ['JS', 'TDD'],
    };
    expect(queryString(obj)).toBe('name=Walace&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Walace',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };
    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to an object', () => {
    const queryString = 'name=Walace&profession=developer';
    expect(parse(queryString)).toEqual({
      name: 'Walace',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const queryString = 'name=Walace';
    expect(parse(queryString)).toEqual({
      name: 'Walace',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const queryString = 'name=Walace&abilities=JS,TDD';
    expect(parse(queryString)).toEqual({
      name: 'Walace',
      abilities: ['JS', 'TDD'],
    });
  });
});
