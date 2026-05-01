import { computed, reactive, ref } from 'vue'
import { EMPTY, cloneBoard, emptyBoard, solve, type Board } from '~/utils/solver'
import { validateInitial, type Conflict } from '~/utils/validator'

export type SudokuStatus = 'idle' | 'solving' | 'solved' | 'invalid' | 'unsolvable'

const SAMPLE_PUZZLE: Board = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

export function useSudoku() {
  const board = ref<Board>(emptyBoard())
  const givens = reactive<boolean[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(false)),
  )
  const conflicts = ref<Conflict[]>([])
  const status = ref<SudokuStatus>('idle')

  const conflictSet = computed(() => new Set(conflicts.value.map(([r, c]) => `${r},${c}`)))

  function isConflict(r: number, c: number): boolean {
    return conflictSet.value.has(`${r},${c}`)
  }

  function isGiven(r: number, c: number): boolean {
    return givens[r][c]
  }

  function setCell(r: number, c: number, value: number) {
    if (status.value === 'solved') {
      resetSolved()
    }
    board.value[r][c] = value
    givens[r][c] = value !== EMPTY
    conflicts.value = []
    if (status.value !== 'solving') status.value = 'idle'
  }

  function resetSolved() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!givens[r][c]) board.value[r][c] = EMPTY
      }
    }
  }

  function clear() {
    board.value = emptyBoard()
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) givens[r][c] = false
    conflicts.value = []
    status.value = 'idle'
  }

  function loadSample() {
    const next = cloneBoard(SAMPLE_PUZZLE)
    board.value = next
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        givens[r][c] = next[r][c] !== EMPTY
      }
    }
    conflicts.value = []
    status.value = 'idle'
  }

  function runSolve() {
    const validation = validateInitial(board.value)
    if (!validation.ok) {
      conflicts.value = validation.conflicts
      status.value = 'invalid'
      return
    }
    conflicts.value = []
    status.value = 'solving'
    const result = solve(board.value)
    if (!result) {
      status.value = 'unsolvable'
      return
    }
    board.value = result
    status.value = 'solved'
  }

  return {
    board,
    status,
    isGiven,
    isConflict,
    setCell,
    clear,
    loadSample,
    runSolve,
  }
}
