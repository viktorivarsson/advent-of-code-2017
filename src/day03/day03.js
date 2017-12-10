// @flow

type matrix = Array<Array<number>>;

// Input
const input = 277678;

// Add
const add = (x: number) => (y: number): number => x + y;

// Get range
const range = (fr: number, to: number): Array<number> =>
  [...Array(to - fr + 1).keys()].map(add(fr));

// Genrate empty cells of given size
const generateEmptyCells = (size: number): matrix => {
  return range(1, size).reduce((container, row) => {
    const cols = range(1, size).reduce((rc, col) => [...rc, 0], []);
    return [...container, cols];
  }, []);
};

// Given top value, and a number, invert the top number based on top value
const invert = (top: number) => (num: number): number => top - num + 1;

// Reverse the matrix, making the lowest value the center, going outwards
const reverseMatrix = (matrix: matrix): matrix => {
  // Get the top value of the matrix
  const topValue = matrix.reduce((top: number, row: Array<number>) => {
    // Get top of the row
    const rowTop = Math.max(...row);

    // Return highest row value
    return rowTop > top ? rowTop : top;
  }, 0);

  // Create a partially applied function to
  // invert an array based on the top value
  const invertTop = invert(topValue);

  // Return the inverted matrix
  return matrix.map(row => row.map(invertTop));
};

// Generate a matrix
const generateMatrix = (num: number): matrix => {
  const total = num * num;
  const matrix = generateEmptyCells(num);

  let x = 0;
  let y = 0;
  let step = 0;
  for (let i = 0; i < total; ) {
    while (y + step < num) {
      i++;
      matrix[x][y] = i;
      y++;
    }
    y--;
    x++;

    while (x + step < num) {
      i++;
      matrix[x][y] = i;
      x++;
    }
    x--;
    y--;

    while (y >= step) {
      i++;
      matrix[x][y] = i;
      y--;
    }
    y++;
    x--;
    step++;

    while (x >= step) {
      i++;
      matrix[x][y] = i;
      x--;
    }
    x++;
    y++;
  }

  // Reverse the matrix and return
  return reverseMatrix(matrix);
};

// Get the width / height of the matrix to include target
const getRequiredSize = (target: number, size = 0): number => {
  const cells = Math.pow(size, 2);

  // If cell number is larger than or equal to target, return size
  if (cells >= target) return size;

  // Try again with incremented size
  return getRequiredSize(target, size + 1);
};

// Given a matrix and a target, return the location as a tuple
const locationOfTarget = (matrix: matrix) => (
  target: number
): Array<number> => {
  return matrix.reduce((location, row, i) => {
    const indexOfBase = row.indexOf(target);

    // If the base was found in row, set location to
    // a tuple-like value based on row and index in row
    if (indexOfBase !== -1) {
      location[0] = indexOfBase;
      location[1] = i;
    }

    return location;
  }, []);
};

// Get difference between two positions
const posDiff = (fr: Array<number>, to: Array<number>): number => {
  const d1 = Math.abs(fr[0] - to[0]);
  const d2 = Math.abs(fr[1] - to[1]);

  return d1 + d2;
};

// Get the distance from start to target
const getDistance = (target: number): number => {
  // Get the smallest possible matrix size to include target number
  const size = getRequiredSize(target);

  // Create a matrix of the required size, beeginning at 1
  const matrix = generateMatrix(size);

  // Get position of starting point and target
  const getLocation = locationOfTarget(matrix);
  const startPos = getLocation(1);
  const targetPos = getLocation(target);

  // Return difference from start to target
  return posDiff(startPos, targetPos);
};

const part1 = getDistance(input);
console.log(part1);
