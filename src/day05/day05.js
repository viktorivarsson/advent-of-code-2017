// @flow

// Read input
const input = require('fs').readFileSync('src/day05/day05.txt', 'utf8');

// Return if a string is not empty
const notEmpty = (x: string): boolean => x !== '';

// Get input as an array of lines, removing empty lines and casting to numbers
const lines = input
  .split('\n')
  .filter(notEmpty)
  .map(Number);

/**
 * PART 1
 */

// Get total number of jumps required
const getJumpsRequired = (inputMaze: Array<number>, part: number): number => {
  // Make maze a copy of the input maze to not mutate the original
  const maze = [...inputMaze];

  let currentIndex = 0;
  let steps = 0;

  // While the current index is smaller than the maze length
  while (currentIndex < maze.length) {
    // Set next index to the sum of current index and the value of current index
    let nextIndex = currentIndex + maze[currentIndex];

    // If part 1 or value of current index is smaller than three,
    // increase the value of current index. If not, decrease it
    if (part === 1 || maze[currentIndex] < 3) {
      maze[currentIndex]++;
    } else {
      maze[currentIndex]--;
    }

    // Set current index to the next calculated index
    currentIndex = nextIndex;

    // Increase the steps taken
    steps++;
  }

  return steps;
};

const part1 = getJumpsRequired(lines, 1);
console.log(part1);

/**
 * PART 2
 */

const part2 = getJumpsRequired(lines, 2);
console.log(part2);
