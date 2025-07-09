// ToDo関連のユーティリティ関数のみに整理

// ID生成機能（To-Do専用）
function generateTodoId(existingTodos) {
  if (existingTodos.length === 0) return 1;
  return Math.max(...existingTodos.map(todo => todo.id)) + 1;
}

// ToDoテキストのバリデーション
function validateTodoText(text) {
  if (!text || text.trim() === '') {
    return { isValid: false, errorMessage: 'テキストは必須です' };
  }
  if (text.length > 100) {
    return { isValid: false, errorMessage: 'テキストは100文字以内で入力してください' };
  }
  return { isValid: true, errorMessage: null };
}

// ToDo検索ヘルパー
function findTodoById(todos, todoId) {
  return todos.find(todo => todo.id === todoId);
}

function findTodoIndexById(todos, todoId) {
  return todos.findIndex(todo => todo.id === todoId);
}

// ToDoフィルタリング
function filterTodosByStatus(todos, status) {
  switch (status) {
    case 'completed':
      return todos.filter(todo => todo.completed === true);
    case 'active':
      return todos.filter(todo => todo.completed === false);
    case 'all':
      return todos;
    default:
      throw new Error('無効なステータスです');
  }
}

module.exports = {
  generateTodoId,
  validateTodoText,
  findTodoById,
  findTodoIndexById,
  filterTodosByStatus
};
