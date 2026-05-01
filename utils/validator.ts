import type { Board } from './solver'
import { EMPTY } from './solver'

export type Conflict = [row: number, col: number]

export interface ValidationResult {
  ok: boolean
  conflicts: Conflict[]
}

export function validateInitial(board: Board): ValidationResult {
  const conflictSet = new Set<string>()
  const mark = (r: number, c: number) => conflictSet.add(`${r},${c}`)

  for (let r = 0; r < 9; r++) {
    const seen = new Map<number, number>()
    for (let c = 0; c < 9; c++) {
      const v = board[r][c]
      if (v === EMPTY) continue
      if (seen.has(v)) {
        mark(r, c)
        mark(r, seen.get(v)!)
      } else {
        seen.set(v, c)
      }
    }
  }

  for (let c = 0; c < 9; c++) {
    const seen = new Map<number, number>()
    for (let r = 0; r < 9; r++) {
      const v = board[r][c]
      if (v === EMPTY) continue
      if (seen.has(v)) {
        mark(r, c)
        mark(seen.get(v)!, c)
      } else {
        seen.set(v, r)
      }
    }
  }

  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen = new Map<number, [number, number]>()
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          const v = board[r][c]
          if (v === EMPTY) continue
          if (seen.has(v)) {
            mark(r, c)
            const [pr, pc] = seen.get(v)!
            mark(pr, pc)
          } else {
            seen.set(v, [r, c])
          }
        }
      }
    }
  }

  const conflicts: Conflict[] = Array.from(conflictSet).map((key) => {
    const [r, c] = key.split(',').map(Number)
    return [r, c]
  })

  return { ok: conflicts.length === 0, conflicts }
}
