

// Read the input
const input = require('fs').readFileSync('src/day02/day02.txt', 'utf8');

// Split input into rows and remove empty rows
const rows = input.split('\n').filter(r => r !== '');

// Get columns as array values casted to integers
const getCols = row => row.split('\t').map(Number);

// Calculate checksum for rows given a function to be applied to every row
const checksum = rows => fn => rows.reduce((sum, row) => sum += fn(row), 0);

/**
 * PART 1
 */

//  Get the difference between column min and max value of a row
const diffMinMax = row => {
  const cols = getCols(row);

  return Math.max(...cols) - Math.min(...cols);
};

const part1 = checksum(rows)(diffMinMax);
console.log(part1);

/**
 * PART 2
 */

// Find a column that can evenly be divided with the requested one
const dividedPartnerValue = (cols, i) => {
  const curr = cols[i];

  // Find dividable values in cols that are not current value
  const dividable = cols.filter(col => col % curr === 0 && col !== curr);

  // If dividable value is found, return current value divided by match
  if (dividable.length) {
    return dividable[0] / curr;
  }

  // Call itself on next column
  return dividedPartnerValue(cols, i + 1);
};

// Given a row, find a column that can be divided by
// another column evenly and return the divided value
const getEvenDivided = row => {
  const cols = getCols(row);

  return dividedPartnerValue(cols, 0);
};

const part2 = checksum(rows)(getEvenDivided);
console.log(part2);