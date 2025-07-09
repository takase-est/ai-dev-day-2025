const { test, expect } = require('@playwright/test');

test.describe('To-Do List UI Tests - Playwright-MCP演習', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // テスト開始前に少し待機してアプリが完全に読み込まれるのを待つ
    await page.waitForTimeout(500);
  });

  // ユニークなタスク名を生成するヘルパー関数
  const generateUniqueTaskName = (prefix) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}_${timestamp}_${random}`;
  };

  test('初期状態の確認', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle(/To-Do List/);
    
    // 主要UI要素の表示確認
    await expect(page.locator('[data-testid="todo-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-button"]')).toBeVisible();
    await expect(page.locator('[data-testid="todo-list"]')).toBeVisible();
    
    // ステータスセクションの確認
    await expect(page.locator('[data-testid="status-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="status-indicator"]')).toBeVisible();
    await expect(page.locator('[data-testid="stats-display"]')).toBeVisible();
  });

  test('ステータス情報の表示確認', async ({ page }) => {
    // ステータスライトが表示されている
    await expect(page.locator('[data-testid="status-light"]')).toBeVisible();
    
    // ステータステキストが設定されている
    const statusText = page.locator('[data-testid="status-text"]');
    await expect(statusText).toContainText(/システム正常|読み込み中/);
    
    // 統計情報が表示されている
    await expect(page.locator('[data-testid="total-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="completed-count"]')).toBeVisible();
    await expect(page.locator('[data-testid="completion-rate"]')).toBeVisible();
    
    // 統計情報が数値として表示されている
    await expect(page.locator('[data-testid="total-count"]')).toContainText(/\d+/);
    await expect(page.locator('[data-testid="completion-rate"]')).toContainText(/\d+%/);
  });

  test('新しいタスクの追加', async ({ page }) => {
    const newTaskText = generateUniqueTaskName('PlaywrightUIテスト用タスク');
    
    // タスク入力
    await page.locator('[data-testid="todo-input"]').fill(newTaskText);
    
    // 追加ボタンクリック
    await page.locator('[data-testid="add-button"]').click();
    
    // タスクが一覧に追加されたことを確認
    await expect(page.locator('[data-testid="todo-list"]')).toContainText(newTaskText);
    
    // 入力欄がクリアされていることを確認
    await expect(page.locator('[data-testid="todo-input"]')).toHaveValue('');
    
    // 統計情報が更新されていることを確認（少し待つ）
    await page.waitForTimeout(1000);
    const totalCount = await page.locator('[data-testid="total-count"]').textContent();
    expect(parseInt(totalCount)).toBeGreaterThan(0);
  });

  test('タスクの完了切り替え', async ({ page }) => {
    // まず新しいタスクを追加
    const taskText = generateUniqueTaskName('完了テスト用タスク');
    await page.locator('[data-testid="todo-input"]').fill(taskText);
    await page.locator('[data-testid="add-button"]').click();
    
    // 追加されたタスクを見つける（最初の一致するもの）
    const todoItem = page.locator('[data-testid^="todo-item-"]').filter({ hasText: taskText }).first();
    await expect(todoItem).toBeVisible();
    
    // タスクテキストをクリックして完了切り替え
    const todoText = todoItem.locator('[data-testid^="todo-text-"]');
    await todoText.click();
    
    // 完了状態のスタイルが適用されていることを確認
    await expect(todoText).toHaveCSS('text-decoration', /line-through/);
    
    // 統計情報の更新を確認
    await page.waitForTimeout(1000);
    const completedCount = await page.locator('[data-testid="completed-count"]').textContent();
    expect(parseInt(completedCount)).toBeGreaterThan(0);
  });

  test('タスクの削除', async ({ page }) => {
    // まず新しいタスクを追加
    const taskText = generateUniqueTaskName('削除テスト用タスク');
    await page.locator('[data-testid="todo-input"]').fill(taskText);
    await page.locator('[data-testid="add-button"]').click();
    
    // 追加されたタスクを見つける（最初の一致するもの）
    const todoItem = page.locator('[data-testid^="todo-item-"]').filter({ hasText: taskText }).first();
    await expect(todoItem).toBeVisible();
    
    // 削除ボタンをクリック
    const deleteButton = todoItem.locator('[data-testid^="delete-button-"]');
    await deleteButton.click();
    
    // タスクが削除されていることを確認
    await expect(todoItem).not.toBeVisible();
    await expect(page.locator('[data-testid="todo-list"]')).not.toContainText(taskText);
  });

  test('フィルタリング機能', async ({ page }) => {
    // テスト開始前に全データをクリア
    await page.request.delete('/api/test/clear-all');
    await page.reload();
    await page.waitForTimeout(500);
    
    // テスト用にいくつかのタスクを追加（ユニークな名前）
    const activeTask1 = generateUniqueTaskName('未完了タスク1');
    const activeTask2 = generateUniqueTaskName('未完了タスク2');
    
    await page.locator('[data-testid="todo-input"]').fill(activeTask1);
    await page.locator('[data-testid="add-button"]').click();
    
    await page.locator('[data-testid="todo-input"]').fill(activeTask2);
    await page.locator('[data-testid="add-button"]').click();
    
    // 1つのタスクを完了にする
    const firstTaskItem = page.locator('[data-testid^="todo-item-"]').filter({ hasText: activeTask1 }).first();
    const firstTaskText = firstTaskItem.locator('[data-testid^="todo-text-"]');
    await firstTaskText.click();
    
    // 少し待機してUI更新を確認
    await page.waitForTimeout(500);
    
    // 「完了」フィルターをクリック
    await page.locator('[data-testid="filter-completed"]').click();
    await page.waitForTimeout(300);
    
    // 完了済みタスクのみが表示されていることを確認
    const visibleTasks = page.locator('[data-testid^="todo-item-"]:visible');
    await expect(visibleTasks).toHaveCount(1);
    
    // 「未完了」フィルターをクリック
    await page.locator('[data-testid="filter-active"]').click();
    await page.waitForTimeout(300);
    
    // 未完了タスクが表示されていることを確認
    await expect(page.locator('[data-testid^="todo-item-"]:visible')).toHaveCount(1);
    
    // 「全て」フィルターをクリック
    await page.locator('[data-testid="filter-all"]').click();
    await page.waitForTimeout(300);
    
    // 全てのタスクが表示されていることを確認
    await expect(page.locator('[data-testid^="todo-item-"]:visible')).toHaveCount(2);
  });

  test('バリデーション機能', async ({ page }) => {
    // 空のタスクで追加しようとする
    await page.locator('[data-testid="add-button"]').click();
    
    // アラートまたはエラーメッセージが表示されることを期待
    // 注意: alertの場合は page.on('dialog', ...) で処理する必要がある
    
    // 長すぎるタスクを入力
    const longText = 'a'.repeat(101);
    await page.locator('[data-testid="todo-input"]').fill(longText);
    await page.locator('[data-testid="add-button"]').click();
    
    // エラーが発生することを期待（タスクが追加されないことを確認）
    await expect(page.locator('[data-testid="todo-list"]')).not.toContainText(longText);
  });

  test('ステータス情報の自動更新', async ({ page }) => {
    // 初期統計を記録
    const initialTotal = await page.locator('[data-testid="total-count"]').textContent();
    
    // 新しいタスクを追加
    const uniqueTaskText = generateUniqueTaskName('自動更新テスト用タスク');
    await page.locator('[data-testid="todo-input"]').fill(uniqueTaskText);
    await page.locator('[data-testid="add-button"]').click();
    
    // ステータス情報が更新されるまで少し待つ
    await page.waitForTimeout(2000);
    
    // 統計が更新されていることを確認
    const updatedTotal = await page.locator('[data-testid="total-count"]').textContent();
    expect(parseInt(updatedTotal)).toBeGreaterThan(parseInt(initialTotal));
    
    // ステータスライトが正常状態を示していることを確認
    await expect(page.locator('[data-testid="status-light"]')).toHaveClass(/status-ok/);
    await expect(page.locator('[data-testid="status-text"]')).toContainText('システム正常');
  });
});
