class Todo {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  static validate(todoData) {
    const errors = [];
    
    if (!todoData.text || todoData.text.trim() === '') {
      errors.push('テキストは必須です');
    }
    
    if (todoData.text && todoData.text.length > 100) {
      errors.push('テキストは100文字以内で入力してください');
    }
    
    return errors;
  }

  static generateId(existingTodos) {
    if (existingTodos.length === 0) return 1;
    return Math.max(...existingTodos.map(todo => todo.id)) + 1;
  }

  static findById(todos, id) {
    return todos.find(todo => todo.id === id);
  }

  static findIndexById(todos, id) {
    return todos.findIndex(todo => todo.id === id);
  }

  static filterByStatus(todos, status) {
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
}

module.exports = Todo;
