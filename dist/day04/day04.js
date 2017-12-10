

// Read input
const input = require('fs').readFileSync('src/day04/day04.txt', 'utf8');

// Return if a string is not empty
const notEmpty = x => x !== '';

// Split string by space
const splitSpace = str => str.split(' ');

// Get input as an array of lines, removing empty lines
const lines = input.split('\n').filter(notEmpty);

// Sort a string by its letters
const sortLetters = str => str.split('').sort().join('');

/**
 * PART 1
 */

// Check if each word in an array of words is unique
const uniqueByWords = words => {
  // Get highest number of repeats for words
  const topOccurances = words.reduce((top, word, i, arr) => {
    const repeats = arr.filter(x => x === word).length;

    return repeats > top ? repeats : top;
  }, 1);

  // Return if top occurances is smaller than two (no words repeated)
  return topOccurances < 2;
};

// Get number of valid phrases by unique words
const numberOfValidPhrases = lines => {
  return lines.map(splitSpace).filter(uniqueByWords).length;
};

const part1 = numberOfValidPhrases(lines);
console.log(part1);

/**
 * PART 2
 */

// Get if array of words are unique by
const uniqueByLetters = words => {
  const sorted = words.map(sortLetters);

  // Get highest number of occurances
  const topOccurances = sorted.reduce((top, word, i, arr) => {
    const repeats = arr.filter(x => x === word).length;

    return repeats > top ? repeats : top;
  }, 0);

  // Return if top occurances is smaller than
  // to (no letter combination repeated)
  return topOccurances < 2;
};

// Get total number of lines that are unique by letters
const validPassphraseByLetters = lines => {
  return lines.map(splitSpace).filter(uniqueByLetters).length;
};

const part2 = validPassphraseByLetters(lines);
console.log(part2);