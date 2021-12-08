const { every, filter, flatten, flow, map, some, sum, range } = require("lodash/fp")

const iterateAllBoardsSquares = flow(map, map, map)

const initializeSquare = number => ({ number, called: false })

const markSquare = calledNumber => square =>
  square.number === calledNumber ? ({ ...square, called: true }) : square

const callNumber = flow(markSquare, iterateAllBoardsSquares)

const hasWinningRow = some(every('called'))

const hasWinningColumn = board => 
  some(
    i => every(row => row[i].called, board),
    range(0, board[0].length)
  )

const isWinner = board => hasWinningRow(board) || hasWinningColumn(board)

const sumUncalledSquares = flow(
  flatten,
  filter(['called', false]),
  map('number'),
  sum
)

const scoreBoard = (board, lastCalledSquare) => sumUncalledSquares(board) * lastCalledSquare

const getSolver = gameRunner => ({ callOrder, boards }) => {
  const initializedBoards = iterateAllBoardsSquares(initializeSquare)(boards)
  const { board, lastCalledNumber } = gameRunner({
    numbersToCall: callOrder,
    boards: initializedBoards
  })
  return scoreBoard(board, lastCalledNumber)
}

module.exports = { callNumber, isWinner, getSolver }