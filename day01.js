// Read the input and only get first line
const input = require('fs')
  .readFileSync('day01.txt', 'utf8')
  .split('\n')[0];

// Return array of numbers from string
const strToNumArray = str => str.split('').map(Number);

/**
 * PART 1
 */

// Calculate the sum of all numbers in the input
// string that matches the next number of the string
const nextMatchSum = input => {
  return strToNumArray(input).reduce((sum, current, index, array) => {
    // Check if item of array
    const last = index === array.length - 1;

    // Get next item (if last item, get first value in array)
    const next = last ? array[0] : array[index + 1];

    // If next and current are the same, add current to sum
    return next === current ? sum + current : sum;
  }, 0);
};

const part1 = nextMatchSum(input);
console.log(part1);

/**
 * PART 2
 */

// Get pairs by dividing the input and group the values by index
const getPairs = input => {
  const halfLength = input.length / 2;

  const aArray = strToNumArray(input.slice(0, halfLength));
  const bArray = strToNumArray(input.slice(halfLength));

  return aArray.map((item, index) => [item, bArray[index]]);
};

// Return if pair keys are equal
const pairIsEqual = x => x[0] === x[1];

// Return sum of an array pair
const sumOfPair = x => x[0] + x[1];

// Given an array, return the sum of the values where the keys are equal
const matchingPairsSum = pairs =>
  pairs.filter(pairIsEqual).reduce((sum, pair) => (sum += sumOfPair(pair)), 0);

const part2 = matchingPairsSum(getPairs(input));
console.log(part2);
