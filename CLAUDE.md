# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 対話
英語で考え、日本語で回答してください。
Githubも日本語で運用するものとします。

## リポジトリ概要

このリポジトリは「AI Dev Day 2025」の3時間ワークショップ教材です。AIエージェントとのペアプログラミングを学習するための教材として設計されており、アシスタント型からエージェント型AIワークフローへの移行を体験できます。

## アーキテクチャ

### 全体構成
```
ai-dev-day-2025/
├── docs/                    # ワークショップドキュメント
│   ├── workshop-plan.md     # 3時間ワークショップの詳細計画
│   └── workshop-curriculum-checklist.md  # 進行チェックリスト
└── todo-app/               # 教材用To-Doリストアプリ（意図的に設計問題あり）
    ├── server.js           # Express API（全ロジック混在）
    ├── utils.js            # 無関係な機能が混在
    ├── data.js             # データアクセス・ビジネスロジック混在
    └── public/             # フロントエンド
        ├── index.html      # Playwright対応UI
        ├── app.js          # グローバル変数乱用
        └── style.css       # 基本スタイル
```

### 教材の設計思想
- **todo-app**は教育目的で**意図的に設計問題**を含んでいる
- リファクタリング学習のため、責任分離・重複排除・命名改善が必要
- TDD（Red-Green-Refactor）サイクルの実践教材
- Playwright-MCP連携によるUI自動テスト学習

## 主要コマンド

### ワークショップ用To-Doアプリ
```bash
# アプリケーション起動
cd todo-app
npm install
npm start
# → http://localhost:3000

# テスト実行
npm test                # Jest単体テスト
npm run test:e2e       # Playwright E2Eテスト
```

### 開発・検証
```bash
# 全体リポジトリ確認
git status
git log --oneline

# ワークショップ構造検証
test -f "docs/workshop-plan.md"
test -f "todo-app/README.md"
```

## ワークショップの3つの演習

### 演習1: エージェントによるリファクタリング（45分）
- 既存To-Do機能をテストで保護
- AIエージェントに高レベルリファクタリング依頼
- 計画レビュー→承認→実行のプロセス体験

### 演習2: TDD駆動開発（30分）
- spec.md作成→失敗テスト（Red）→実装（Green）→改善（Refactor）
- /statusエンドポイント追加
- フロントエンド・バックエンド統合TDD

### 演習3: Playwright-MCP UI-TDD（45分）
- playwright-mcpツールでUIテスト自動生成
- 外部tech-docsからレートリミット情報取得
- UI-TDDサイクル実践

## 重要な教材特性

### 意図的な設計問題
- **server.js**: 全ロジック混在、重複処理、不適切な変数名（`t`, `d`）
- **utils.js**: To-Do以外の無関係機能混在（hexToRgb、validateEmail等）
- **data.js**: データアクセス・ビジネスロジック・統計処理混在
- **public/app.js**: グローバル変数乱用、DOM操作とAPI通信混在

### Playwright対応
- 全UIコンポーネントに`data-testid`属性設定済み
- 自動テスト生成に最適化されたマークアップ

## 作業時の注意点

### 教材の完整性保持
- **todo-app内の設計問題は意図的**なものなので、勝手に修正しない
- 受講者がAIエージェントとのリファクタリングを体験するための教材

### ワークショップ進行支援
- 受講者は`todo-app/README.md`の手順に従って進行
- 各演習用のプロンプト例が記載されている
- 人間がナビゲーター、AIエージェントがドライバーの協業スタイル

### 時間制約考慮
- 各演習は厳密な時間制限あり（45分/30分/45分）
- 複雑さは45分でリファクタリング完了可能に調整済み