const { flow, map, split, parseInt, trim } = require("lodash/fp");

const parseBingoBoards = input => {
  const [rawCallOrder, ...rawBoards] = split('\n\n', input);
  const callOrder = flow(
    split(','),
    map(parseInt(10))
  )(rawCallOrder);
  const boards = map(
    flow(
      split('\n'),
      map(flow(
        trim,
        split(/\s+/),
        map(parseInt(10))
      ))
    ),
    rawBoards
  )
  return { callOrder, boards };
}

module.exports = parseBingoBoards;