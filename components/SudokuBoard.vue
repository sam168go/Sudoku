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
  border: 1px solid #e2e8f0;
  background: #e2e8f0;
  border-radius: 16px;
  overflow: hidden;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.04),
    0 8px 24px -8px rgba(15, 23, 42, 0.1),
    0 24px 48px -24px rgba(15, 23, 42, 0.12);
}
</style>
