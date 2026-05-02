# 數獨解題器

線上數獨解題工具：輸入題目即可自動求解。純前端、靜態部署。

## 技術棧

- **Nuxt 3** — 檔案式路由、靜態輸出（`nitro.preset: 'static'`）
- **Vue 3** + Composition API（SFC、`<script setup>`）
- **TypeScript**

## 開發

需要 Node 20（見 `.nvmrc`）。

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 產出 .output/
npm run generate   # 靜態生成（部署到 Cloudflare Pages 等）
npm run typecheck
```

`dist/` 是 `→ .output/public` 的 symlink，給 Cloudflare Pages 使用。

## 專案結構

```
app.vue                       Nuxt 進入點，僅渲染 <NuxtPage />
nuxt.config.ts                靜態輸出設定、<head> meta
pages/
  index.vue                   首頁：棋盤 + 狀態列 + 動作按鈕
components/
  SudokuBoard.vue             9×9 grid 容器
  SudokuCell.vue              單格 <input>，依狀態切換樣式
composables/
  useSudoku.ts                狀態中樞：board / givens / conflicts / status
utils/
  solver.ts                   回溯法求解（純函式）
  validator.ts                列／行／3×3 宮衝突檢查
assets/css/main.css           全域樣式
```

## 架構重點

- **狀態集中於 composable**：[composables/useSudoku.ts](composables/useSudoku.ts) 是唯一的資料來源；元件只負責顯示與發送事件。
- **演算法純函式化**：[utils/solver.ts](utils/solver.ts) 與 [utils/validator.ts](utils/validator.ts) 不依賴 Vue，可獨立測試或替換。
- **狀態機式 UI**：`status` 為 `idle | solving | solved | invalid | unsolvable`，狀態列文案與按鈕行為據此切換。
- **求解流程**：`runSolve()` 先呼叫 `validateInitial` 標出衝突格；通過後再執行 `solve()` 回溯。

## 視覺風格

整體採深色科技風：

- 深空藍背景 + 雙色 radial 光暈（青/紫）+ 細網格紋
- 標題為青→靛→紫漸層字，按鈕為玻璃感面板搭配青色霓虹邊框與發光 hover
- 棋盤外框帶多層 glow，營造邊緣輝光感

格子色彩語義：

- 亮白粗體：使用者輸入的題目（`given`）
- 青色發光：演算法填入的解（`solved`）
- 紅光底色：與其他格衝突（`conflict`）
- 每格僅接受 1–9，留空表示未知

## 部署

`npm run generate` 後將 `dist/`（即 `.output/public`）部署到任何靜態主機。本專案目標為 Cloudflare Pages。
