# 入門者向け補足教材

AI Dev Day 2025ワークショップの入門者向け補足教材です。

## 事前準備

### 必要なツール
- Node.js 18.x以上
- Git
- Visual Studio Code
- GitHub Copilot（有効なサブスクリプション）

### VSCodeエージェントモードの有効化

GitHub Copilotのエージェントモードを有効にして、より高度なAI協業を体験できます。

#### 1. GitHub Copilot Chat拡張機能のインストール
```bash
# VSCodeで以下の拡張機能をインストール
# 1. GitHub Copilot
# 2. GitHub Copilot Chat
```

#### 2. エージェントモードの有効化
最新版では特別な設定は不要です。GitHub Copilot拡張機能がインストールされていれば自動的に利用可能になります。

**注意**: 古いバージョンのVS Codeを使用している場合のみ、以下の設定が必要な場合があります：
```json
{
  "github.copilot.chat.agent.enabled": true
}
```

#### 推奨モデル
エージェントモードでは以下のモデルの使用を推奨します：
- **GPT-4.1**: より高度な推論能力
- **Claude Sonnet 3.5**: 複雑なリファクタリング提案とコンテキストを考慮した実装

#### 3. チャットパネルの設定
1. チャットパネルを開く（`Cmd+Shift+I` / `Ctrl+Shift+I`）
2. チャット欄の上部にある設定ボタンを確認：

##### モード選択ボタン
- **Ask Mode**: 質問回答型の基本モード（コードを変更せず説明のみ）
- **Edit Mode**: 指定したファイルに対してコード編集を実行
- **Agent Mode**: プロジェクト全体を自律的に分析・編集するモード（推奨）
- エージェントモードは複数ファイルを横断した複雑なタスクに最適

##### モデル選択ボタン
- **GPT-4.1**: 最も高性能な推論モデル（推奨）
- **Claude Sonnet 3.5**: 高性能なリファクタリングモデル（推奨）
- **その他**: 環境により利用可能なモデルが表示

## 基本概念

### MCP（Model Context Protocol）
MCPは、AIモデルと外部ツールを安全に接続するためのオープンプロトコルです。

#### MCPの役割
- **AIと外部ツールの橋渡し**: データベース、API、ファイルシステムなどへの安全なアクセス
- **セキュリティ**: 権限管理とアクセス制御
- **標準化**: 異なるツール間での一貫したインターフェース

#### このワークショップでの使用例
- **Playwright-MCP**: ブラウザ操作の自動化
- **外部API連携**: レート制限情報の取得
- **ファイルシステム**: プロジェクトファイルの操作

#### MCPサーバーの設定

A. ワンクリックでインストール可能なサーバーもある
https://code.visualstudio.com/mcp

B. コマンドラインから設定する場合
```bash
# VS Codeでの設定例
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'

# Claude Codeでの設定例
claude mcp add playwright npx @playwright/mcp@latest
```

#### MCP使用時の注意点
- **同時有効化制限**: VS Codeで同時に有効にできるMCPツールは**128個**まで
- **必要なツールのみ**を有効化してパフォーマンスを維持
- 不要なMCPサーバーは無効化または削除を推奨

### TDD（テスト駆動開発）
1. **Red**: 失敗するテストを先に作成
2. **Green**: テストを通すための最小限の実装
3. **Refactor**: コードの改善・整理

### Git操作の基本
```bash
# 現在の状態確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "コミットメッセージ"

# プッシュ
git push origin ブランチ名
```

### AI協業のベストプラクティス
1. **人間がナビゲーター**: 目標と方針を決定
2. **AIがドライバー**: 具体的な実装を担当
3. **段階的な進行**: 小さな単位で確認しながら進める
4. **テストファースト**: 変更前に既存機能を保護

## トラブルシューティング

### よくある問題

#### Node.js関連
```bash
# Node.jsのバージョン確認
node --version

# npmのバージョン確認
npm --version

# 依存関係のインストール
npm install
```

#### Git関連
```bash
# リモートリポジトリの確認
git remote -v

# ブランチの確認
git branch -a

# 変更の破棄
git checkout -- ファイル名
```

#### VSCode関連
- GitHub Copilotにログインできない → VSCodeを再起動
- エージェントモードが動作しない → 拡張機能を最新版に更新
- チャットパネルが表示されない → `View` → `Command Palette` → `GitHub Copilot Chat: Open Chat`

## 用語集

- **MCP**: Model Context Protocol - AIツール間の連携プロトコル
- **Playwright**: Webアプリケーションのテスト自動化ツール
- **TDD**: Test Driven Development - テスト駆動開発
- **リファクタリング**: 動作を変えずにコードの構造を改善すること
- **エージェントモード**: AIが自律的に複数のタスクを実行するモード

## 次のステップ

1. [`todo-app/README.md`](../todo-app/README.md) でワークショップの詳細を確認
2. 各演習の時間配分を意識して進行
3. 困った時はこのガイドを参照
4. AIエージェントと対話しながら学習を進める