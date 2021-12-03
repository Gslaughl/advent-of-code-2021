const { flow, reduce, split } = require('lodash/fp');

const positionReducer = ({ horiz, depth, aim }, command) => {
  const [direction, distanceStr] = split(' ', command);
  const distance = parseInt(distanceStr);

  switch (direction) {
    case 'up':
      return {
        horiz,
        depth,
        aim: aim - distance
      };
    case 'down':
      return {
        horiz,
        depth,
        aim: aim + distance
      };
    case 'forward':
      return {
        horiz: horiz + distance,
        depth: depth + (aim * distance),
        aim
      };
  }
}

const solve = flow(
  reduce(positionReducer, { horiz: 0, depth: 0, aim: 0 }),
  ({ horiz, depth }) => horiz * depth,
)

module.exports = solve