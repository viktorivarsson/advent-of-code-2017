// @flow

// Return if a string is not empty
const notEmpty = (x: string): boolean => x !== '';

// Read input, split by new lines and remove empty lines
const input = require('fs')
  .readFileSync('src/day08/day08.txt', 'utf8')
  .split('\n')
  .filter(notEmpty);

// Give two values to compare and an operator, return the condition passes
const compare = (aVal: number, operator: string, bVal: number): boolean => {
  const conditions = {
    '!=': aVal !== bVal,
    '==': aVal === bVal,
    '>': aVal > bVal,
    '<': aVal < bVal,
    '>=': aVal >= bVal,
    '<=': aVal <= bVal
  };

  return conditions[operator];
};

// Get number value from value key or numeric string
const getVal = (values: Object, keyOrVal: string): number => {
  if (isNaN(keyOrVal)) {
    return values[keyOrVal] ? Number(values[keyOrVal]) : 0;
  }

  return Number(keyOrVal);
};

type keyVal = { key: string, value: number };
type action = 'inc' | 'dec';

// Calculate a single row evaluation and its value change
const calculateRow = (values: Object, row: string): keyVal => {
  // Split the row string into separate parts
  const parts = row.split(' ');

  // Key (register name)
  const key = parts[0];

  // Values and operator for comparison
  const aVal = getVal(values, parts[4]);
  const bVal = getVal(values, parts[6]);
  const operator = parts[5];

  // If the condition return false, return the
  if (!compare(aVal, operator, bVal))
    return { key, value: getVal(values, key) };

  // Get action and the value to increment / decrement
  const action: action = parts[1];
  const actionValue = getVal(values, parts[2]);

  // Increase action, add to the value
  if (action === 'inc') {
    return {
      key,
      value: getVal(values, key) + actionValue
    };
  }

  // Decrease action, subtract from the value
  return {
    key,
    value: getVal(values, key) - actionValue
  };
};

/**
 * PART 1
 */

// Calculate the input for step 1, given the input rows array
const calculatePart1 = (input: Array<string>): number => {
  // Get the sums of all rows
  const rowSums = input.reduce((values: Object, row: string) => {
    const result = calculateRow(values, row);

    // Replace the values and give the key of the row its new value
    return {
      ...values,
      [result.key]: result.value
    };
  }, {});

  // Get the max value from the row sum rows
  return Math.max(...Object.values(rowSums).map(Number));
};

const part1 = calculatePart1(input);
console.log('part 1:', part1);

/**
 * PART 2
 */

// Calculate the input for step, given the input rows array
const calculatePart2 = (input: Array<string>): number => {
  // Return the max value of all row values
  return input.reduce((values: Object, row: string) => {
    const result = calculateRow(values, row);

    // Get the values max value and default to 0
    const valuesMax: number = values.__MAX_VALUE__ || 0;

    // Set max to the highest of result value and values max
    const max = result.value > valuesMax ? result.value : valuesMax;

    // Replace the values and give the key of the row its new value
    return {
      ...values,
      __MAX_VALUE__: max,
      [result.key]: result.value
    };
  }, {}).__MAX_VALUE__;
};

const part2 = calculatePart2(input);
console.log('part 2:', part2);
