var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Return if a string is not empty
const notEmpty = x => x !== '';

// Read input, split by new lines and remove empty lines
const input = require('fs').readFileSync('src/day08/day08.txt', 'utf8').split('\n').filter(notEmpty);

// Give two values to compare and an operator, return the condition passes
const compare = (aVal, operator, bVal) => {
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
const getVal = (values, keyOrVal) => {
  if (isNaN(keyOrVal)) {
    return values[keyOrVal] ? Number(values[keyOrVal]) : 0;
  }

  return Number(keyOrVal);
};

// Calculate a single row evaluation and its value change
const calculateRow = (values, row) => {
  // Split the row string into separate parts
  const parts = row.split(' ');

  // Key (register name)
  const key = parts[0];

  // Values and operator for comparison
  const aVal = getVal(values, parts[4]);
  const bVal = getVal(values, parts[6]);
  const operator = parts[5];

  // If the condition return false, return the
  if (!compare(aVal, operator, bVal)) return { key, value: getVal(values, key) };

  // Get action and the value to increment / decrement
  const action = parts[1];
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
const calculateInput = input => {
  // Get the sums of all rows
  const rowSums = input.reduce((values, row) => {
    const result = calculateRow(values, row);

    // Replace the values and give the key of the row its new value
    return _extends({}, values, {
      [result.key]: result.value
    });
  }, {});

  // Get the max value from the row sum rows
  return Math.max(...Object.values(rowSums).map(Number));
};

const part1 = calculateInput(input);
console.log(part1);