class TodoApp {
  constructor() {
    this.state = {
      todos: [],
      currentFilter: 'all',
      isLoading: false,
      status: null // TDD演習：ステータス情報
    };
    
    this.ui = new TodoUI();
    this.initializeEventListeners();
    this.loadTodos();
    this.initializeStatusUpdates(); // TDD演習：ステータス更新の初期化
  }

  initializeEventListeners() {
    // タスク追加
    this.ui.elements.addButton?.addEventListener('click', () => {
      this.handleAddTodo();
    });

    // Enterキーでタスク追加
    this.ui.elements.todoInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleAddTodo();
      }
    });

    // フィルター切り替え
    this.ui.elements.filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.handleFilterChange(button.dataset.filter);
      });
    });

    // ToDo項目のクリックと削除（イベント委譲）
    this.ui.elements.todoList?.addEventListener('click', (e) => {
      const todoItem = e.target.closest('.todo-item');
      if (!todoItem) return;

      const todoId = parseInt(todoItem.dataset.todoId);

      if (e.target.classList.contains('delete-btn')) {
        this.handleDeleteTodo(todoId);
      } else if (e.target.classList.contains('todo-text')) {
        this.handleToggleTodo(todoId);
      }
    });

    // 全て完了/未完了切り替え
    this.ui.elements.markAllButton?.addEventListener('click', () => {
      this.handleMarkAllCompleted();
    });

    // 完了済み削除
    this.ui.elements.clearCompletedButton?.addEventListener('click', () => {
      this.handleClearCompleted();
    });
  }

  async loadTodos() {
    try {
      this.setLoading(true);
      const todos = await TodoAPI.getAllTodos();
      this.state.todos = todos;
      this.renderTodos();
    } catch (error) {
      this.ui.showError('ToDoの読み込みに失敗しました: ' + error.message);
    } finally {
      this.setLoading(false);
    }
  }

  async handleAddTodo() {
    const todoText = this.ui.getInputValue();
    
    if (todoText === '') {
      this.ui.showError('タスクを入力してください');
      return;
    }
    
    if (todoText.length > 100) {
      this.ui.showError('タスクは100文字以内で入力してください');
      return;
    }

    try {
      this.setLoading(true);
      const newTodo = await TodoAPI.createTodo(todoText);
      this.state.todos.push(newTodo);
      this.ui.clearInput();
      this.renderTodos();
      this.updateStatus(); // TDD演習：ステータス更新
    } catch (error) {
      this.ui.showError(error.message);
    } finally {
      this.setLoading(false);
    }
  }

  async handleToggleTodo(todoId) {
    const todo = this.state.todos.find(t => t.id === todoId);
    if (!todo) return;

    try {
      const updatedTodo = await TodoAPI.updateTodo(todoId, { 
        completed: !todo.completed 
      });
      
      const todoIndex = this.state.todos.findIndex(t => t.id === todoId);
      this.state.todos[todoIndex] = updatedTodo;
      this.renderTodos();
      this.updateStatus(); // TDD演習：ステータス更新
    } catch (error) {
      this.ui.showError(error.message);
    }
  }

  async handleDeleteTodo(todoId) {
    try {
      await TodoAPI.deleteTodo(todoId);
      this.state.todos = this.state.todos.filter(t => t.id !== todoId);
      this.renderTodos();
      this.updateStatus(); // TDD演習：ステータス更新
    } catch (error) {
      this.ui.showError(error.message);
    }
  }

  async handleFilterChange(filter) {
    this.state.currentFilter = filter;
    this.ui.updateFilterButtons(filter);
    this.renderTodos();
  }

  async handleMarkAllCompleted() {
    const allCompleted = this.state.todos.every(todo => todo.completed);
    const newCompletedState = !allCompleted;

    try {
      const updatePromises = this.state.todos.map(todo => 
        TodoAPI.updateTodo(todo.id, { completed: newCompletedState })
      );
      
      const updatedTodos = await Promise.all(updatePromises);
      this.state.todos = updatedTodos;
      this.renderTodos();
    } catch (error) {
      this.ui.showError('一括更新に失敗しました: ' + error.message);
    }
  }

  async handleClearCompleted() {
    const completedTodos = this.state.todos.filter(todo => todo.completed);
    
    try {
      const deletePromises = completedTodos.map(todo => 
        TodoAPI.deleteTodo(todo.id)
      );
      
      await Promise.all(deletePromises);
      this.state.todos = this.state.todos.filter(todo => !todo.completed);
      this.renderTodos();
    } catch (error) {
      this.ui.showError('完了済みタスクの削除に失敗しました: ' + error.message);
    }
  }

  renderTodos() {
    // フィルタリング表示を使用
    this.ui.displayFilteredTodos(this.state.todos, this.state.currentFilter);
  }

  setLoading(isLoading) {
    this.state.isLoading = isLoading;
    this.ui.updateButtonState(isLoading);
  }

  // TDD演習：ステータス更新機能
  initializeStatusUpdates() {
    // 初回ステータス取得
    this.updateStatus();
    
    // 5秒間隔でステータス更新
    setInterval(() => {
      this.updateStatus();
    }, 5000);
  }

  async updateStatus() {
    try {
      const statusData = await TodoAPI.getStatus();
      this.state.status = statusData;
      this.ui.updateStatus(statusData);
    } catch (error) {
      this.ui.showStatusError(error.message);
    }
  }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
  window.todoApp = new TodoApp();
});
