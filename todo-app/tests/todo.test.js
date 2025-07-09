const request = require('supertest');
const app = require('../server');

describe('Todo API Tests - 既存機能保護用', () => {
  let todoId;

  // 既存機能1: ToDo一覧取得
  test('GET /api/todos - ToDo一覧が取得できる', async () => {
    const response = await request(app)
      .get('/api/todos')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2); // サンプルデータ
  });

  // 既存機能2: ToDo作成
  test('POST /api/todos - 新しいToDoが作成できる', async () => {
    const newTodo = { text: 'テスト用タスク' };
    
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);
    
    expect(response.body.text).toBe('テスト用タスク');
    expect(response.body.completed).toBe(false);
    expect(response.body.id).toBeDefined();
    
    todoId = response.body.id; // 後続テスト用に保存
  });

  // 既存機能3: バリデーション
  test('POST /api/todos - 空のテキストはエラーになる', async () => {
    const invalidTodo = { text: '' };
    
    await request(app)
      .post('/api/todos')
      .send(invalidTodo)
      .expect(400);
  });

  test('POST /api/todos - 100文字を超えるテキストはエラーになる', async () => {
    const longText = 'a'.repeat(101);
    const invalidTodo = { text: longText };
    
    await request(app)
      .post('/api/todos')
      .send(invalidTodo)
      .expect(400);
  });

  // 既存機能4: ToDo更新
  test('PUT /api/todos/:id - ToDoが更新できる', async () => {
    // まず新しいToDoを作成
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ text: '更新テスト用タスク' });
    
    const todoId = createResponse.body.id;
    
    // 更新実行
    const updateData = { text: '更新済みタスク', completed: true };
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send(updateData)
      .expect(200);
    
    expect(response.body.text).toBe('更新済みタスク');
    expect(response.body.completed).toBe(true);
  });

  // 既存機能5: ToDo削除
  test('DELETE /api/todos/:id - ToDoが削除できる', async () => {
    // まず新しいToDoを作成
    const createResponse = await request(app)
      .post('/api/todos')
      .send({ text: '削除テスト用タスク' });
    
    const todoId = createResponse.body.id;
    
    // 削除実行
    await request(app)
      .delete(`/api/todos/${todoId}`)
      .expect(204);
    
    // 削除されたことを確認
    await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ text: 'test' })
      .expect(404);
  });

  // 既存機能6: フィルタリング
  test('GET /api/todos/filter/all - 全てのToDoが取得できる', async () => {
    const response = await request(app)
      .get('/api/todos/filter/all')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/todos/filter/completed - 完了済みToDoが取得できる', async () => {
    const response = await request(app)
      .get('/api/todos/filter/completed')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    // 完了済みのものだけが含まれることを確認
    response.body.forEach(todo => {
      expect(todo.completed).toBe(true);
    });
  });

  test('GET /api/todos/filter/active - 未完了ToDoが取得できる', async () => {
    const response = await request(app)
      .get('/api/todos/filter/active')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
    // 未完了のものだけが含まれることを確認
    response.body.forEach(todo => {
      expect(todo.completed).toBe(false);
    });
  });

  // 既存機能7: 無効なフィルタ
  test('GET /api/todos/filter/invalid - 無効なフィルタはエラーになる', async () => {
    await request(app)
      .get('/api/todos/filter/invalid')
      .expect(400);
  });

  // 既存機能8: 存在しないToDo操作
  test('PUT /api/todos/999 - 存在しないToDoの更新はエラーになる', async () => {
    await request(app)
      .put('/api/todos/999')
      .send({ text: 'test' })
      .expect(404);
  });

  test('DELETE /api/todos/999 - 存在しないToDoの削除はエラーになる', async () => {
    await request(app)
      .delete('/api/todos/999')
      .expect(404);
  });
});

// TDD演習：ステータス機能のテスト（Red段階）
describe('Status API Tests - TDD演習', () => {
  test('GET /api/status - ステータス情報が正常に取得できる', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);
    
    // レスポンス構造の検証
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('todos');
    expect(response.body).toHaveProperty('server');
    
    // timestamp形式の検証（ISO 8601）
    expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    
    // todos統計情報の検証
    const todos = response.body.todos;
    expect(todos).toHaveProperty('total');
    expect(todos).toHaveProperty('completed');
    expect(todos).toHaveProperty('active');
    expect(todos).toHaveProperty('completionRate');
    expect(typeof todos.total).toBe('number');
    expect(typeof todos.completed).toBe('number');
    expect(typeof todos.active).toBe('number');
    expect(typeof todos.completionRate).toBe('number');
    
    // 統計の論理的整合性
    expect(todos.total).toBe(todos.completed + todos.active);
    expect(todos.completionRate).toBeGreaterThanOrEqual(0);
    expect(todos.completionRate).toBeLessThanOrEqual(100);
    
    // server情報の検証
    const server = response.body.server;
    expect(server).toHaveProperty('uptime');
    expect(server).toHaveProperty('environment');
    expect(typeof server.uptime).toBe('number');
    expect(server.uptime).toBeGreaterThanOrEqual(0);
  });

  test('GET /api/status - 統計情報が実際のToDoデータと一致する', async () => {
    // 現在のTo-Do一覧を取得
    const todosResponse = await request(app)
      .get('/api/todos')
      .expect(200);
    
    const todos = todosResponse.body;
    const expectedTotal = todos.length;
    const expectedCompleted = todos.filter(todo => todo.completed).length;
    const expectedActive = expectedTotal - expectedCompleted;
    const expectedCompletionRate = expectedTotal > 0 
      ? Math.round((expectedCompleted / expectedTotal) * 1000) / 10 
      : 0;
    
    // ステータス情報を取得
    const statusResponse = await request(app)
      .get('/api/status')
      .expect(200);
    
    const stats = statusResponse.body.todos;
    
    // 統計が実際のデータと一致することを確認
    expect(stats.total).toBe(expectedTotal);
    expect(stats.completed).toBe(expectedCompleted);
    expect(stats.active).toBe(expectedActive);
    expect(stats.completionRate).toBe(expectedCompletionRate);
  });

  test('GET /api/status - バージョン情報が正しく設定されている', async () => {
    const response = await request(app)
      .get('/api/status')
      .expect(200);
    
    // package.jsonのバージョンと一致することを確認
    expect(response.body.version).toBe('1.0.0');
  });
});
