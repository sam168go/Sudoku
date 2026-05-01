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
  padding: 32px 16px 64px;
  gap: 20px;
}

.header {
  text-align: center;
  margin-bottom: 4px;
}

.header h1 {
  font-size: clamp(24px, 4vw, 32px);
  margin: 0 0 6px;
  color: #0f172a;
  letter-spacing: 0.02em;
}

.subtitle {
  margin: 0;
  color: #475569;
  font-size: 14px;
}

.status {
  margin: 0;
  font-size: 14px;
  color: #475569;
  min-height: 1.5em;
}

.status--invalid,
.status--unsolvable {
  color: #b91c1c;
  font-weight: 600;
}

.status--solved {
  color: #047857;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.btn {
  appearance: none;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #1f2937;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.05s ease, background 0.12s ease, border-color 0.12s ease;
}

.btn:hover {
  border-color: #94a3b8;
  background: #f8fafc;
}

.btn:active {
  transform: translateY(1px);
}

.btn--primary {
  background: #2563eb;
  border-color: #2563eb;
  color: #fff;
}

.btn--primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.btn--ghost {
  background: transparent;
  color: #475569;
}

.footer {
  margin-top: 24px;
  font-size: 12px;
  color: #94a3b8;
}

.footer p {
  margin: 0;
}
</style>
