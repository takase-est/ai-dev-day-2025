// データアクセス層（シンプルに整理）

class TodoRepository {
  constructor() {
    // メモリ内データストレージ（実際のアプリではDBを使用）
    this.todos = [
      { id: 1, text: 'サンプルタスク1', completed: false, createdAt: new Date('2024-01-01') },
      { id: 2, text: 'サンプルタスク2', completed: true, createdAt: new Date('2024-01-02') }
    ];
  }

  // 全件取得
  findAll() {
    return this.todos.map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt
    }));
  }

  // ID検索
  findById(todoId) {
    return this.todos.find(todo => todo.id === todoId) || null;
  }

  // 作成
  create(todoData) {
    const newId = this.generateNextId();
    const newTodo = {
      id: newId,
      text: todoData.text.trim(),
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(newTodo);
    return newTodo;
  }

  // 更新
  update(todoId, updates) {
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
      return null;
    }

    if (updates.text !== undefined) {
      this.todos[todoIndex].text = updates.text.trim();
    }
    if (updates.completed !== undefined) {
      this.todos[todoIndex].completed = updates.completed;
    }

    return this.todos[todoIndex];
  }

  // 削除
  delete(todoId) {
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
      return false;
    }

    this.todos.splice(todoIndex, 1);
    return true;
  }

  // フィルタリング
  findByStatus(status) {
    switch (status) {
      case 'completed':
        return this.todos.filter(todo => todo.completed === true);
      case 'active':
        return this.todos.filter(todo => todo.completed === false);
      case 'all':
        return this.todos;
      default:
        throw new Error('無効なステータスです');
    }
  }

  // プライベートメソッド：次のIDを生成
  generateNextId() {
    if (this.todos.length === 0) return 1;
    return Math.max(...this.todos.map(todo => todo.id)) + 1;
  }

  // 統計情報取得（必要に応じて）
  getStats() {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      active,
      completionRate: Math.round(completionRate * 100) / 100
    };
  }
}

// シングルトンインスタンス
const todoRepository = new TodoRepository();

module.exports = todoRepository;
