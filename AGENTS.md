# Repository Guidelines

## プロジェクト構成と配置
- ルート: `docs/`（ワークショップ資料）、`.github/`（ワークフロー・プロンプト）、`todo-app/`（演習用アプリ）。
- `todo-app/` 主要ファイル: `server.js`（Express + 静的配信）、`public/`（`index.html`/`app.js`/`style.css`）、`utils.js`、`data.js`、`tests/`（Jest）。


## ビルド・実行・テスト
- 初回/実行: `cd todo-app && npm install && npm start`（`http://localhost:3000`）。
- 単体/統合テスト: `npm test`（Jest、`tests/*.test.js`）。HTTPはSupertest推奨。
- E2E: `npm run test:e2e`（初回は `npx playwright install` が必要）。

## コーディング規約・命名
- JavaScript: 2スペース、セミコロン有、シングルクォート。
- 命名: 変数/関数は`camelCase`、クラスは`PascalCase`、ファイルは小文字ハイフン（例: `todo-service.js`）。
- 責務分離: リファクタ時は controller/service/model へ分割。`public/` はDOM/UI、APIロジックはサーバ側に保持。
- 形式: Prettierのローカル利用推奨。既存スタイルに合わせて最小差分。

## テスト指針
- フレームワーク: Jest、Supertest、Playwright。UIには`data-testid`が整備済み。
- 追加テスト: 仕様ごとに1ファイル（`<feature>.test.js`）。ヘルパは`tests/`配下に集約。
- 事前実行: PR前に`npm test`と`npm run test:e2e`を通す。新規/変更箇所は概ね80%目安の有意な網羅。

## コミット/PR ガイド
- コミット: 日本語で短く具体的に書くこと。
  - 例: `feat: フィルタAPIを追加`, `docs: README.mdを更新`, `refactor: validationを分離`。
- PR: 目的・変更点・テスト結果（スクショ/GIF歓迎）・関連Issueを記載。変更は`todo-app/`にスコープ。

## 教材の意図とエージェント注意事項
- todo-appは学習用に意図的な設計問題を含む。勝手に恒久修正せず、テスト先行で小さく提案→計画→実施の順に進める。
- ワークショップはTDD（Red-Green-Refactor）とリファクタリング体験が目的。UIはPlaywrightで検証可能。
- リポジトリ運用は日本語推奨。思考は英語でも、成果物（Issue/PR/コメント/本文）は日本語で明確に。
- 参照資料: `todo-app/README.md` と `.github/copilot-instructions.md`、`docs/` 内のワークショップ文書。

## 学習サポート（TODO）
- 進行ルール: 演習はステップバイステップで進行し、次の項目に進む前に必ずユーザーの承認を取得する。
### ワークショップTODO

- [ ] 目的共有: AI導入の現状/課題/リスクを把握（パート1概要）
- [ ] 環境確認: Node 18+, VS Code, Git, Copilot（Agent Mode）（`node -v`, `npm -v`）
- [ ] モデル選択: GPT-5 または Claude Sonnet 4

#### 演習0（0–30分）セットアップ
- [ ] リポジトリ構成確認（`docs/`, `todo-app/`）
- [ ] 依存導入と起動（`cd todo-app && npm install && npm start`）
- [ ] Copilot Agent Mode 有効化とチャット準備（Ask/Edit/Agentの違い確認）

#### 演習1（45分）リファクタリング
- [ ] 既存機能の保護テストを追加（Jest/Supertest, `tests/*.test.js`）
- [ ] エージェントに計画立案→レビュー→承認→実行を依頼（小さく反復）
- [ ] 複数ファイル変更の結果と動作を確認（`npm test`/手動動作）
- [ ] チェックポイント1: 全ペア完了を確認・支援

#### 演習2（30分）TDD駆動開発
- [ ] `spec.md` 作成（要件を明文化）
- [ ] `/status` の Red→Green→Refactor（Jestで失敗→最小実装→整理）
- [ ] UI側の対応を同様にTDD（必要ならE2Eも）
- [ ] チェックポイント2: テスト成功の確認

#### 休憩/バッファ（105–120分）
- [ ] 進捗共有とブロッカー解消

-#### 演習3（120–165分）Playwright操作とE2E
- [ ] Playwright 初期化（テスト/ブラウザ操作前に1回だけ `npx playwright install`）
- [ ] Playwright MCP のインストール/有効化（`npx @playwright/mcp@latest` または IDE でMCP追加）
- [ ] チャット体験（テストは書かない）
  - プロンプト: 「playwright MCPでlocalhost:3000を開いてください」
  - プロンプト: 「playwright MCPで新しいタスクを追加してください」
  - プロンプト: 「スクリーンショットを取得して playwright-report/mcp-smoke.png に保存してください」
  - プロンプト: 「追加したタスクを削除してください」
- [ ] UIテスト作成/実行（Playwright）（`npm run test:e2e`）
  - 補足: 自動テストにMCPは不要（MCPは探索・体験用）
- [ ] チェックポイント3: チャット操作とE2E実行が全ペアで完了

#### クロージング
- [ ] 成果共有（テスト結果・変更差分・学び）
- [ ] 次のステップ（課題/拡張、リファクタ継続、CI導入検討）
