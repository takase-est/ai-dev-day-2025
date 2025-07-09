class TodoAPI {
  static async getAllTodos() {
    const response = await fetch('/api/todos');
    if (!response.ok) {
      throw new Error('ToDo一覧の取得に失敗しました');
    }
    return response.json();
  }

  static async createTodo(todoText) {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: todoText })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'ToDoの作成に失敗しました');
    }
    
    return response.json();
  }

  static async updateTodo(todoId, updates) {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'ToDoの更新に失敗しました');
    }
    
    return response.json();
  }

  static async deleteTodo(todoId) {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'ToDoの削除に失敗しました');
    }
  }

  static async getFilteredTodos(filter) {
    const response = await fetch(`/api/todos/filter/${filter}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'フィルタリングに失敗しました');
    }
    return response.json();
  }

  static async getStatus() {
    const response = await fetch('/api/status');
    if (!response.ok) {
      throw new Error('ステータス情報の取得に失敗しました');
    }
    return response.json();
  }
}

window.TodoAPI = TodoAPI;
