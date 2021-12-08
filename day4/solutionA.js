const { find } = require("lodash/fp")
const { callNumber, isWinner, getSolver } = require('./shared')

const runGameUntilFirstWinner = ({
  numbersToCall: [callingNumber, ...remainingNumbers],
  boards
}) => {
  const markedBoards = callNumber(callingNumber)(boards)
  const winner = find(isWinner, markedBoards)
  return winner
    ? { board: winner, lastCalledNumber: callingNumber }
    : runGameUntilFirstWinner({ numbersToCall: remainingNumbers, boards: markedBoards })
}

module.exports = getSolver(runGameUntilFirstWinner)