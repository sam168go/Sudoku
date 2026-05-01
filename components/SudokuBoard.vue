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
  border: 2px solid #1f2937;
  background: #1f2937;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 30px -12px rgba(15, 23, 42, 0.25);
}
</style>
