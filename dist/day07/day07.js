

// Return if a string is not empty
const notEmpty = x => x !== '';

// Read input, split by new lines and remove empty lines
const input = require('fs').readFileSync('src/day07/day07.txt', 'utf8').split('\n').filter(notEmpty);

// Trim string
const trim = str => str.trim();

// Split a string by space and return first array item to get name
const getName = str => {
  return str.split(' ')[0];
};

// Get array of children from string
const getChildren = str => {
  const children = str.split('->')[1];

  if (!children) return null;

  return children.split(',').map(trim);
};

// Get name of bottom node
const getBottom = input => {
  // Get the children of all items
  const allChildren = input.reduce((children, item) => {
    const itemChildren = getChildren(item);

    if (itemChildren) {
      return [...children, ...itemChildren];
    }

    return children;
  }, []);

  // Get item names
  const itemNames = input.map(item => getName(item));

  // Get the nodes that are not children
  const notChildren = itemNames.filter(name => allChildren.indexOf(name) === -1);

  // If there are items that are not children, return first one
  return notChildren.length ? notChildren[0] : 'No bottom could be found.';
};

const part1 = getBottom(input);
console.log(part1);