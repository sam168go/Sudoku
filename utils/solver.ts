export type Cell = number
export type Board = Cell[][]

export const EMPTY: Cell = 0

export function cloneBoard(board: Board): Board {
  return board.map((row) => row.slice())
}

export function emptyBoard(): Board {
  return Array.from({ length: 9 }, () => Array<Cell>(9).fill(EMPTY))
}

export function isValid(board: Board, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false
    if (board[i][col] === num) return false
  }
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false
    }
  }
  return true
}

export function solve(input: Board): Board | null {
  const board = cloneBoard(input)
  if (!backtrack(board)) return null
  return board
}

function backtrack(board: Board): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== EMPTY) continue
      for (let n = 1; n <= 9; n++) {
        if (isValid(board, r, c, n)) {
          board[r][c] = n
          if (backtrack(board)) return true
          board[r][c] = EMPTY
        }
      }
      return false
    }
  }
  return true
}
