// @flow

// Read input, split by tab and cast array values to number
const input = require('fs')
  .readFileSync('src/day06/day06.txt', 'utf8')
  .split('\t')
  .map(Number);

// Dispense blocks into banks
const dispense = (
  banks: Array<number>,
  currentIndex: number
): Array<number> => {
  // Get the number of banks
  const numberOfBanks = banks.length;

  // Set next index to the current for so long
  let nextIndex = currentIndex;

  // Get number of blocks
  let blocks = banks[currentIndex];

  // Empty the current index in the banks array
  banks[currentIndex] = 0;

  // Dispense the blocks of current index to other banks
  while (blocks > 0) {
    // If last item in array, the "next" index
    // is the first, otherwise it's next index
    nextIndex = numberOfBanks > nextIndex + 1 ? nextIndex + 1 : 0;

    // Decrement the blocks number and increment next index to dispense to
    blocks--;
    banks[nextIndex]++;
  }

  return banks;
};

// Solve cycles problem given the banks as input
const getCyclesToDetectInfinite = (banks: Array<number>): Array<number> => {
  // Create a new set to store block set combinations
  const blocksInBanks = new Set();

  // Set done to false by default, and start with
  // number of iterations and cycles in loop at 0
  let done = false;
  let numberOfIterations = 0;
  let cyclesInLoop = 0;

  while (!done) {
    // Increment number of iterations
    numberOfIterations++;

    // Get the max value of the banks
    const max = Math.max(...banks);

    // Get index of the max value
    const indexOfMax = banks.indexOf(max);

    // Dispense from this block evenly through
    // blocks and assign banks to the result
    banks = dispense(banks, indexOfMax);

    // If the block in banks has this combination
    if (blocksInBanks.has(banks.toString())) {
      // Make array from the blocks in banks set
      const blocksArray = Array.from(blocksInBanks);

      // Find index of the repeated bank
      const indexOfBlock = blocksArray.indexOf(banks.toString());

      // Set the cycles in loop to the blocks array
      // length minus index of the found block
      cyclesInLoop = blocksArray.length - indexOfBlock;
      done = true;
    }

    // Add the current block to the blocks in banks
    blocksInBanks.add(banks.toString());
  }

  // Return number of iterations and cycles in loop
  return [numberOfIterations, cyclesInLoop];
};

const answers = getCyclesToDetectInfinite(input);
console.log('Part 1:', answers[0]);
console.log('Part 2:', answers[1]);
