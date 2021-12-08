const { flow, map, split, parseInt } = require("lodash/fp");

const parseLineSegments = flow(
  split('\n'),
  map(flow(
    split(' -> '),
    map(flow(
      split(','),
      map(parseInt(10))
    ))
  ))
)

module.exports = parseLineSegments;