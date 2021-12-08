const { zip } = require("lodash/fp")
const { getSolver, inclusiveRange } = require("./shared")

const convertDiagonalSegmentToPoints = ([[x1, y1], [x2, y2]]) =>
  zip(inclusiveRange(x1, x2), inclusiveRange(y1, y2))

module.exports = getSolver(convertDiagonalSegmentToPoints)