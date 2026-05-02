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
  font-size: clamp(26px, 4.5vw, 36px);
  margin: 0 0 8px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: linear-gradient(90deg, #67e8f9 0%, #818cf8 50%, #c084fc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 24px rgba(103, 232, 249, 0.25);
}

.subtitle {
  margin: 0;
  color: #94a3b8;
  font-size: 14px;
  letter-spacing: 0.04em;
}

.status {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
  min-height: 1.5em;
  letter-spacing: 0.04em;
}

.status--invalid,
.status--unsolvable {
  color: #fb7185;
  font-weight: 600;
  text-shadow: 0 0 12px rgba(251, 113, 133, 0.45);
}

.status--solved {
  color: #34d399;
  font-weight: 600;
  text-shadow: 0 0 12px rgba(52, 211, 153, 0.45);
}

.status--solving {
  color: #67e8f9;
  text-shadow: 0 0 12px rgba(103, 232, 249, 0.45);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.btn {
  appearance: none;
  border: 1px solid rgba(103, 232, 249, 0.35);
  background: rgba(15, 23, 42, 0.6);
  color: #cbd5e1;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: transform 0.05s ease, background 0.18s ease, border-color 0.18s ease,
    box-shadow 0.18s ease, color 0.18s ease;
}

.btn:hover {
  border-color: rgba(103, 232, 249, 0.8);
  color: #e0f2fe;
  background: rgba(8, 47, 73, 0.55);
  box-shadow: 0 0 0 1px rgba(103, 232, 249, 0.2), 0 0 18px rgba(103, 232, 249, 0.25);
}

.btn:active {
  transform: translateY(1px);
}

.btn--primary {
  background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 0 22px rgba(99, 102, 241, 0.45), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.btn--primary:hover {
  background: linear-gradient(135deg, #22d3ee 0%, #818cf8 100%);
  box-shadow: 0 0 28px rgba(129, 140, 248, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.btn--ghost {
  background: transparent;
  color: #94a3b8;
  border-color: rgba(148, 163, 184, 0.3);
}

.btn--ghost:hover {
  color: #cbd5e1;
  border-color: rgba(148, 163, 184, 0.6);
  box-shadow: none;
}

.footer {
  margin-top: 24px;
  font-size: 12px;
  color: #475569;
  letter-spacing: 0.05em;
}

.footer p {
  margin: 0;
}
</style>
