const { join, map: cappedMap, reduce, flow } = require('lodash/fp');
const map = cappedMap.convert({ cap: false });

const incrementTally = binString => (tallyAtIndex, i) => 
  binString[i] === '1'
    ? tallyAtIndex + 1
    : tallyAtIndex


const tallyOnesPerIndex = (tallies, binString) => map(incrementTally(binString), tallies)

const invertBit = bit => bit === '1' ? '0' : '1';

const formatTalliesIntoAnswer = inputLength => tallies => {
  const gammaBits = map(tally => tally > (inputLength / 2) ? '1' : '0', tallies);
  const epsilonBits = map(invertBit, gammaBits);
  const [gamma, epsilon] = map(
    flow(join(''), bin => parseInt(bin, 2)),
    [gammaBits, epsilonBits]
  );
  return gamma * epsilon
}

const solve = input => {
  const initialTallies = new Array(input[0].length).fill(0);
  return flow(
    reduce(tallyOnesPerIndex, initialTallies),
    formatTalliesIntoAnswer(input.length)
  )(input);
}

module.exports = solve