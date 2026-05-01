<script setup lang="ts">
interface Props {
  value: number
  row: number
  col: number
  isGiven: boolean
  isConflict: boolean
  readonly?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', row: number, col: number, value: number): void
}>()

const display = computed(() => (props.value === 0 ? '' : String(props.value)))

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const raw = target.value.replace(/[^1-9]/g, '').slice(-1)
  const next = raw === '' ? 0 : Number(raw)
  target.value = raw
  emit('update', props.row, props.col, next)
}
</script>

<template>
  <input
    class="cell"
    :class="{
      given: isGiven,
      solved: !isGiven && value !== 0,
      conflict: isConflict,
      'right-edge': (col + 1) % 3 === 0 && col !== 8,
      'bottom-edge': (row + 1) % 3 === 0 && row !== 8,
    }"
    :value="display"
    :readonly="readonly"
    inputmode="numeric"
    maxlength="1"
    autocomplete="off"
    @input="onInput"
  />
</template>

<style scoped>
.cell {
  width: 100%;
  height: 100%;
  border: 1px solid #cbd5e1;
  background: #fff;
  text-align: center;
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 500;
  color: #2563eb;
  outline: none;
  padding: 0;
  border-radius: 0;
  transition: background 0.12s ease, box-shadow 0.12s ease;
}

.cell:focus {
  background: #eff6ff;
  box-shadow: inset 0 0 0 2px #3b82f6;
  position: relative;
  z-index: 1;
}

.cell.given {
  color: #111827;
  font-weight: 700;
}

.cell.solved {
  color: #2563eb;
}

.cell.conflict {
  background: #fee2e2;
  color: #b91c1c;
}

.cell.right-edge {
  border-right: 2px solid #1f2937;
}

.cell.bottom-edge {
  border-bottom: 2px solid #1f2937;
}

.cell[readonly] {
  cursor: default;
}
</style>
