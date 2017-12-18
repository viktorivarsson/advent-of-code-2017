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

// Calculate the input for step, given the input rows array
const calculateInput = (input: Array<string>): number => {
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

const part1 = calculateInput(input);
console.log(part1);
