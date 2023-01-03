const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('should creat a valid query string when an object is provided', () => {
    const obj = {
      name: 'Walace',
      profession: 'developer'
    };
    expect(queryString(obj)).toBe('name=Walace&profession=developer');
  });
});