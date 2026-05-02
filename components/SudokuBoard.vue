<script setup lang="ts">
import type { Board } from '~/utils/solver'

interface Props {
  board: Board
  isGiven: (row: number, col: number) => boolean
  isConflict: (row: number, col: number) => boolean
  readonly?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', row: number, col: number, value: number): void
}>()

function onCellUpdate(row: number, col: number, value: number) {
  emit('update', row, col, value)
}
</script>

<template>
  <div class="board" role="grid" aria-label="數獨棋盤">
    <template v-for="(row, r) in props.board" :key="r">
      <SudokuCell
        v-for="(value, c) in row"
        :key="`${r}-${c}`"
        :value="value"
        :row="r"
        :col="c"
        :is-given="props.isGiven(r, c)"
        :is-conflict="props.isConflict(r, c)"
        :readonly="props.readonly"
        @update="onCellUpdate"
      />
    </template>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  aspect-ratio: 1 / 1;
  width: min(92vw, 480px);
  border: 1px solid rgba(103, 232, 249, 0.5);
  background: rgba(103, 232, 249, 0.55);
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(103, 232, 249, 0.15),
    0 0 30px rgba(56, 189, 248, 0.25),
    0 0 60px rgba(99, 102, 241, 0.18),
    0 20px 50px -20px rgba(0, 0, 0, 0.7);
}
</style>
