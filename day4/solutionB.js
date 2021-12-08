const { filter, negate } = require("lodash/fp")
const { callNumber, isWinner, getSolver } = require('./shared')

const runGameUntilLastWinner = ({
  numbersToCall: [callingNumber, ...remainingNumbers],
  boards
}) => {
  const markedBoards = callNumber(callingNumber)(boards)
  const unWonBoards = filter(negate(isWinner), markedBoards)
  return unWonBoards.length === 0
    ? { board: markedBoards[0], lastCalledNumber: callingNumber }
    : runGameUntilLastWinner({ numbersToCall: remainingNumbers, boards: unWonBoards })
}

module.exports = getSolver(runGameUntilLastWinner)