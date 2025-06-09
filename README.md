# Sales-GUI
![Platform](https://img.shields.io/badge/platform-tauri-blue)

🚀 個人專案 |

本專案旨在練習前後端整合技術與桌面應用程式的開發，並嘗試打造一套實用、輕量化的小型 ERP系統。
系統將具備基本 ERP 架構，主要整合了銷售、進貨、庫存跟會計相關等功能。

## 功能與進度

1. 銷售、進貨、庫存資料管理  
2. 基礎會計分錄記帳功能
3. 支援 Excel 匯入（例如請購清單、進貨紀錄等）
4. 模組化 UI，功能可擴充
5. 跨平台桌面應用（支援 Windows / macOS / Linux）

| 功能模組         | 狀態     | 目標功能          |
| ------------ | ------ | ------------- |
| 銷售、進貨、庫存資料管理 | 🟡 開發中 | 新增/編輯/查詢/刪除訂單 |
| 會計分錄         | ⚪ 待開發  | 根據訂單資料自動建立分錄  |
| Excel 匯入功能   | 🟢 已完成 | 支持匯入本地Excel資料   |
| Excel 匯出功能   | ⚪ 待開發  |               |

## 使用技術

這個專案主要使用以下技術建構：

| 領域   | 技術                                  |
| ---- | ----------------------------------- |
| 前端   | Vue 3, Nuxt 3, TypeScript           |
| 樣式   | Tailwind CSS                        |
| 桌面應用 | Tauri                               |
| 資料處理 | Rust（透過 Tauri command 操作本地資料與 CRUD） |

## 畫面設計

 ![](./screenshots/Frame1.png)

## 如何啟動專案

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
# or
pnpm run tauri dev

# Build the application for production
npm run tauri build

#Locally preview production build
pnpm preview
```

## 專案結構（簡略）

```bash
├── src-tauri/
├── server/
├── pages/
├── components/
├── composables/
├── stores/
├── types/
```
