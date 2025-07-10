const Todo = require('../models/Todo');

class TodoService {
  constructor() {
    // 初期データ（実際のアプリでは外部データソースから読み込み）
    this.todos = [
      new Todo(1, 'サンプルタスク1', false),
      new Todo(2, 'サンプルタスク2', true)
    ];
  }

  getAllTodos() {
    return this.todos.map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed
    }));
  }

  createTodo(todoData) {
    const validationErrors = Todo.validate(todoData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors[0]);
    }

    const newId = Todo.generateId(this.todos);
    const newTodo = new Todo(newId, todoData.text.trim(), false);
    
    this.todos.push(newTodo);
    return {
      id: newTodo.id,
      text: newTodo.text,
      completed: newTodo.completed
    };
  }

  updateTodo(id, updates) {
    const todoIndex = Todo.findIndexById(this.todos, id);
    if (todoIndex === -1) {
      throw new Error('ToDoが見つかりません');
    }

    if (updates.text !== undefined) {
      const validationErrors = Todo.validate(updates);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]);
      }
      this.todos[todoIndex].text = updates.text.trim();
    }

    if (updates.completed !== undefined) {
      this.todos[todoIndex].completed = updates.completed;
    }

    return {
      id: this.todos[todoIndex].id,
      text: this.todos[todoIndex].text,
      completed: this.todos[todoIndex].completed
    };
  }

  deleteTodo(id) {
    const todoIndex = Todo.findIndexById(this.todos, id);
    if (todoIndex === -1) {
      throw new Error('ToDoが見つかりません');
    }

    this.todos.splice(todoIndex, 1);
    return true;
  }

  filterTodos(status) {
    try {
      const filteredTodos = Todo.filterByStatus(this.todos, status);
      return filteredTodos.map(todo => ({
        id: todo.id,
        text: todo.text,
        completed: todo.completed
      }));
    } catch (error) {
      throw error;
    }
  }

  // テスト用: 全データクリア
  clearAll() {
    this.todos = [];
    return true;
  }
}

// シングルトンインスタンス（実際のアプリでは依存性注入を使用）
const todoService = new TodoService();

module.exports = todoService;
