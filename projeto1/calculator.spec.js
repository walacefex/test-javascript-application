const {sum} = require('./calculator')
it('sum 2 and 2 and the result must be 4', () => {
  /*Using not to negate the value.*/
  //expect(sum(2, 2)).not.toBe(4) 
  /*Using the To Be method to check if the value is as expected.*/
  expect(sum(2, 2)).toBe(4); 
});

it('should sum 2 and 2 even if one of them is a string and the result must be 4', () => {
  expect(sum('2', '2')).toBe(4); 
});

it('should throw an error if what is provided to the method cannot be summed', () => {
  expect( () => {
    sum('', '2');
  }).toThrowError();

  expect( () => {
    sum([2 ,2]);
  }).toThrowError();

  expect( () => {
    sum({});
  }).toThrowError();

  expect( () => {
    sum();
  }).toThrowError();
});