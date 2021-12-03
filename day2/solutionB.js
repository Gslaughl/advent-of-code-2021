const { flow, reduce, split } = require('lodash/fp');

const positionReducer = ([horiz, depth], command) => {
  const [direction, distanceStr] = split(' ', command);
  const distance = parseInt(distanceStr);

  switch (direction) {
    case 'up':
      return [horiz, depth - distance];
    case 'down':
      return [horiz, depth + distance];
    case 'forward':
      return [horiz + distance, depth];
  }
}

const solve = flow(
  reduce(positionReducer, [0, 0]),
  ([horiz, depth]) => horiz * depth,
)

module.exports = solve