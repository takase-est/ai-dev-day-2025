# To-Doアプリケーション ステータス機能仕様

## 概要
アプリケーションの状態とTo-Do統計情報を取得するAPIエンドポイントを追加する。

## API仕様

### GET /api/status

#### 概要
アプリケーションの動作状況とTo-Do統計情報を返す。

#### レスポンス形式
```json
{
  "status": "ok",
  "timestamp": "2025-07-09T06:50:47.509Z",
  "version": "1.0.0",
  "todos": {
    "total": 5,
    "completed": 2,
    "active": 3,
    "completionRate": 40.0
  },
  "server": {
    "uptime": 1234567,
    "environment": "development"
  }
}
```

#### フィールド説明
- `status`: アプリケーションの状態（"ok" | "error"）
- `timestamp`: レスポンス生成時刻（ISO 8601形式）
- `version`: アプリケーションバージョン
- `todos.total`: 総To-Do数
- `todos.completed`: 完了済みTo-Do数
- `todos.active`: 未完了To-Do数
- `todos.completionRate`: 完了率（%、小数点1桁）
- `server.uptime`: サーバー稼働時間（秒）
- `server.environment`: 実行環境

#### ステータスコード
- 200: 正常レスポンス
- 500: サーバーエラー

## フロントエンド仕様

### ステータス表示UI
- ヘッダー部分にステータス情報を表示
- 統計情報（総数、完了数、完了率）をリアルタイム更新
- 5秒間隔で自動更新

### UI要素
```html
<div class="status-section" data-testid="status-section">
  <div class="status-indicator" data-testid="status-indicator">
    <span class="status-light"></span>
    <span class="status-text">システム正常</span>
  </div>
  <div class="stats-display" data-testid="stats-display">
    <span>総数: <span data-testid="total-count">0</span></span>
    <span>完了: <span data-testid="completed-count">0</span></span>
    <span>完了率: <span data-testid="completion-rate">0%</span></span>
  </div>
</div>
```

## 実装要件

### バックエンド
1. `GET /api/status`エンドポイントの実装
2. To-Do統計情報の計算機能
3. サーバー情報の取得機能
4. エラーハンドリング

### フロントエンド
1. ステータス表示UIコンポーネント
2. 定期的なステータス取得機能
3. ステータス更新時のUI反映
4. エラー状態の表示

## テスト要件

### APIテスト
- ステータスエンドポイントの正常レスポンス
- レスポンス形式の検証
- 統計情報の正確性
- エラーハンドリング

### E2Eテスト
- ステータス表示の初期表示
- 統計情報の動的更新
- エラー状態の表示
