<script setup lang="ts">
const { board, status, isGiven, isConflict, setCell, clear, loadSample, runSolve } = useSudoku()

const statusMessage = computed(() => {
  switch (status.value) {
    case 'solving':
      return '解題中…'
    case 'solved':
      return '完成！藍色為演算法填入的答案。'
    case 'invalid':
      return '輸入有衝突，請檢查紅色格。'
    case 'unsolvable':
      return '此題無解。'
    default:
      return '請輸入題目，然後按「解題」。'
  }
})

const statusClass = computed(() => `status status--${status.value}`)

useHead({
  title: '數獨解題器',
})
</script>

<template>
  <main class="page">
    <header class="header">
      <h1>數獨解題器</h1>
      <p class="subtitle">輸入題目的已知數字，按下「解題」即可自動求解。</p>
    </header>

    <SudokuBoard
      :board="board"
      :is-given="isGiven"
      :is-conflict="isConflict"
      @update="setCell"
    />

    <p :class="statusClass" role="status" aria-live="polite">{{ statusMessage }}</p>

    <div class="actions">
      <button class="btn btn--primary" type="button" @click="runSolve">解題</button>
      <button class="btn" type="button" @click="loadSample">載入範例</button>
      <button class="btn btn--ghost" type="button" @click="clear">清除</button>
    </div>

    <footer class="footer">
      <p>提示：每一格僅能輸入 1–9，留空表示未知。</p>
    </footer>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 56px 20px 80px;
  gap: 28px;
}

.header {
  text-align: center;
  margin-bottom: 4px;
}

.header h1 {
  font-size: clamp(28px, 4.5vw, 40px);
  margin: 0 0 10px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 15px;
  font-weight: 400;
}

.status {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  min-height: 1.5em;
  font-weight: 500;
}

.status--invalid,
.status--unsolvable {
  color: #dc2626;
}

.status--solved {
  color: #059669;
}

.status--solving {
  color: #4f46e5;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.btn {
  appearance: none;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #0f172a;
  padding: 11px 22px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.005em;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  transition: transform 0.05s ease, background 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease, color 0.15s ease;
}

.btn:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.btn--primary {
  background: #4f46e5;
  border-color: #4f46e5;
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(79, 70, 229, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.btn--primary:hover {
  background: #4338ca;
  border-color: #4338ca;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.btn--ghost {
  background: transparent;
  color: #64748b;
  border-color: transparent;
  box-shadow: none;
}

.btn--ghost:hover {
  color: #0f172a;
  background: #f1f5f9;
  border-color: transparent;
  box-shadow: none;
}

.footer {
  margin-top: 16px;
  font-size: 13px;
  color: #94a3b8;
}

.footer p {
  margin: 0;
}
</style>
