const { countBy, filter, flatMap, flow, identity, join, map, range, values } = require("lodash/fp")

const inclusiveRange = (start, end) => {
  const offByOne = start < end ? 1 : -1
  return range(start, end + offByOne)
}

const convertSegmentToPoints = convertDiagonal => segment => {
  const [[x1, y1], [x2, y2]] = segment
  if (x1 === x2) // vertical
    return map(y => [x1, y], inclusiveRange(y1, y2))
  if (y1 === y2) // horizontal
    return map(x => [x, y1], inclusiveRange(x1, x2))
  return convertDiagonal(segment)
}

const getSolver = convertDiagonal => flow(
  flatMap(flow(
    convertSegmentToPoints(convertDiagonal),
    map(join(','))
  )),
  countBy(identity),
  values,
  filter(n => n > 1),
  arr => arr.length
)

module.exports = { inclusiveRange, getSolver }