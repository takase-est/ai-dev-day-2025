// データアクセスとビジネスロジックが混在している（悪い設計）

// メモリ内データストレージ
let todoStorage = [
  { id: 1, text: 'サンプルタスク1', completed: false, createdAt: new Date('2024-01-01') },
  { id: 2, text: 'サンプルタスク2', completed: true, createdAt: new Date('2024-01-02') }
];

// 統計情報（本来は別の場所で管理すべき）
let stats = {
  totalCreated: 2,
  totalCompleted: 1,
  totalDeleted: 0
};

// 全件取得 - 統計更新とデータ取得が混在
function getAllTodos() {
  // なぜかここで統計を更新している
  stats.lastAccessed = new Date();
  
  let result = [];
  for (let i = 0; i < todoStorage.length; i++) {
    let todo = todoStorage[i];
    result.push({
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      createdAt: todo.createdAt
    });
  }
  
  return result;
}

// ID検索 - エラーハンドリングが不統一
function findTodoById(id) {
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].id === id) {
      return todoStorage[i];
    }
  }
  return null; // ここではnull
}

// 作成処理 - バリデーションとデータ操作とビジネスロジックが混在
function createTodo(todoData) {
  // バリデーション処理
  if (!todoData.text || todoData.text.trim() === '') {
    throw new Error('テキストは必須です'); // ここではthrow
  }
  
  if (todoData.text.length > 100) {
    throw new Error('テキストは100文字以内で入力してください');
  }
  
  // ID生成ロジック
  let maxId = 0;
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].id > maxId) {
      maxId = todoStorage[i].id;
    }
  }
  
  // ビジネスルール: 同じテキストのToDoは作成できない
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].text.toLowerCase() === todoData.text.toLowerCase().trim()) {
      throw new Error('同じ内容のToDoは既に存在します');
    }
  }
  
  let newTodo = {
    id: maxId + 1,
    text: todoData.text.trim(),
    completed: false,
    createdAt: new Date()
  };
  
  todoStorage.push(newTodo);
  
  // 統計更新
  stats.totalCreated++;
  
  return newTodo;
}

// 更新処理 - 複雑な業務ルールが混在
function updateTodo(id, updates) {
  let todoIndex = -1;
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].id === id) {
      todoIndex = i;
      break;
    }
  }
  
  if (todoIndex === -1) {
    return { error: 'ToDoが見つかりません' }; // 他と違うエラー形式
  }
  
  let todo = todoStorage[todoIndex];
  
  // テキスト更新時のバリデーション
  if (updates.text !== undefined) {
    if (!updates.text || updates.text.trim() === '') {
      return { error: 'テキストは必須です' };
    }
    if (updates.text.length > 100) {
      return { error: 'テキストは100文字以内で入力してください' };
    }
    
    // 重複チェック（自分以外）
    for (let i = 0; i < todoStorage.length; i++) {
      if (i !== todoIndex && todoStorage[i].text.toLowerCase() === updates.text.toLowerCase().trim()) {
        return { error: '同じ内容のToDoは既に存在します' };
      }
    }
    
    todo.text = updates.text.trim();
    todo.updatedAt = new Date();
  }
  
  // 完了状態更新時の特別なロジック
  if (updates.completed !== undefined) {
    let wasCompleted = todo.completed;
    todo.completed = updates.completed;
    
    // 統計更新
    if (!wasCompleted && updates.completed) {
      stats.totalCompleted++;
      todo.completedAt = new Date();
    } else if (wasCompleted && !updates.completed) {
      stats.totalCompleted--;
      delete todo.completedAt;
    }
  }
  
  return todo;
}

// 削除処理 - またもや統計処理が混在
function deleteTodo(id) {
  let todoIndex = -1;
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].id === id) {
      todoIndex = i;
      break;
    }
  }
  
  if (todoIndex === -1) {
    return false;
  }
  
  let deletedTodo = todoStorage[todoIndex];
  todoStorage.splice(todoIndex, 1);
  
  // 統計更新
  stats.totalDeleted++;
  if (deletedTodo.completed) {
    stats.totalCompleted--;
  }
  
  return true;
}

// フィルタリング処理 - データアクセスと業務ロジックが混在
function filterTodosByStatus(status) {
  let result = [];
  
  for (let i = 0; i < todoStorage.length; i++) {
    let todo = todoStorage[i];
    
    if (status === 'completed' && todo.completed) {
      result.push(todo);
    } else if (status === 'active' && !todo.completed) {
      result.push(todo);
    } else if (status === 'all') {
      result.push(todo);
    }
  }
  
  // ソート処理も混在
  if (status === 'completed') {
    result.sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0));
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return result;
}

// 統計取得 - 計算ロジックが混在
function getStats() {
  let activeCount = 0;
  let completedCount = 0;
  
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage[i].completed) {
      completedCount++;
    } else {
      activeCount++;
    }
  }
  
  return {
    total: todoStorage.length,
    active: activeCount,
    completed: completedCount,
    completionRate: todoStorage.length > 0 ? Math.round((completedCount / todoStorage.length) * 100) : 0,
    ...stats
  };
}

// 一括操作（本来は別の場所にあるべき業務ロジック）
function markAllCompleted() {
  let updatedCount = 0;
  for (let i = 0; i < todoStorage.length; i++) {
    if (!todoStorage[i].completed) {
      todoStorage[i].completed = true;
      todoStorage[i].completedAt = new Date();
      updatedCount++;
      stats.totalCompleted++;
    }
  }
  return updatedCount;
}

function clearCompleted() {
  let removedCount = 0;
  for (let i = todoStorage.length - 1; i >= 0; i--) {
    if (todoStorage[i].completed) {
      todoStorage.splice(i, 1);
      removedCount++;
      stats.totalDeleted++;
      stats.totalCompleted--;
    }
  }
  return removedCount;
}

module.exports = {
  getAllTodos,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  filterTodosByStatus,
  getStats,
  markAllCompleted,
  clearCompleted
};