const { invertBit, parseBinary } = require('./shared');
const { filter, flow, map, reduce } = require('lodash/fp');

const incrementOnesTally = index => (tally, binStr) =>
  binStr[index] === '1' ? tally + 1 : tally

const mostCommonBitAtIndex = (index, binStrs) => {
  const onesAtIndex = reduce(incrementOnesTally(index), 0, binStrs)
  return onesAtIndex * 2 >= binStrs.length ? '1' : '0'
}

const leastCommonBitAtIndex = flow(mostCommonBitAtIndex, invertBit)

const filterCandidates = ({ indexToCheck = 0, getBitToMatch, candidates }) => {
  const remainingCandidates = filter(
    candidate => candidate[indexToCheck] === getBitToMatch(indexToCheck, candidates),
    candidates
  )
  return remainingCandidates.length === 1 ?
    remainingCandidates[0] :
    filterCandidates({
      indexToCheck: indexToCheck + 1,
      getBitToMatch,
      candidates: remainingCandidates
    })
}

const solve = input => {
  const [oxygenGenerator, co2Scrubber] = map(
    flow(
      bitGetter => filterCandidates({ getBitToMatch: bitGetter, candidates: input }),
      parseBinary
    ),
    [mostCommonBitAtIndex, leastCommonBitAtIndex]
  )
  return oxygenGenerator * co2Scrubber
}

module.exports = solve