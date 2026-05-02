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
  border: 1px solid rgba(244, 114, 182, 0.18);
  background: rgba(15, 5, 28, 0.92);
  text-align: center;
  font-size: clamp(18px, 4vw, 26px);
  font-weight: 500;
  color: #f0abfc;
  outline: none;
  padding: 0;
  border-radius: 0;
  caret-color: #f0abfc;
  transition: background 0.12s ease, box-shadow 0.12s ease, color 0.12s ease;
}

.cell:focus {
  background: rgba(112, 26, 117, 0.3);
  box-shadow: inset 0 0 0 2px #ec4899, 0 0 18px rgba(236, 72, 153, 0.5);
  position: relative;
  z-index: 1;
}

.cell.given {
  color: #fdf4ff;
  font-weight: 700;
  text-shadow: 0 0 6px rgba(253, 244, 255, 0.3);
}

.cell.solved {
  color: #67e8f9;
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
}

.cell.conflict {
  background: rgba(190, 18, 60, 0.4);
  color: #fecaca;
  text-shadow: 0 0 8px rgba(251, 113, 133, 0.65);
}

.cell.right-edge {
  border-right: 2px solid rgba(244, 114, 182, 0.6);
}

.cell.bottom-edge {
  border-bottom: 2px solid rgba(244, 114, 182, 0.6);
}

.cell[readonly] {
  cursor: default;
}
</style>
