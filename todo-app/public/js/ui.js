class TodoUI {
  constructor() {
    this.elements = {};
    this.initializeElements();
  }

  initializeElements() {
    this.elements = {
      todoInput: document.getElementById('todoInput'),
      addButton: document.getElementById('addButton'),
      todoList: document.getElementById('todoList'),
      filterButtons: document.querySelectorAll('.filter-button'),
      todoCount: document.getElementById('todoCount'),
      markAllButton: document.getElementById('markAllCompleted'),
      clearCompletedButton: document.getElementById('clearCompleted'),
      // TDD演習：ステータス表示要素
      statusSection: document.querySelector('[data-testid="status-section"]'),
      statusIndicator: document.querySelector('[data-testid="status-indicator"]'),
      statusLight: document.querySelector('[data-testid="status-light"]'),
      statusText: document.querySelector('[data-testid="status-text"]'),
      statsDisplay: document.querySelector('[data-testid="stats-display"]'),
      totalCount: document.querySelector('[data-testid="total-count"]'),
      completedCount: document.querySelector('[data-testid="completed-count"]'),
      completionRate: document.querySelector('[data-testid="completion-rate"]')
    };
  }

  displayTodos(todos) {
    const todoList = this.elements.todoList;
    todoList.innerHTML = '';

    todos.forEach(todo => {
      const todoItem = this.createTodoElement(todo);
      todoList.appendChild(todoItem);
    });

    this.updateTodoCount(todos);
  }

  // フィルタリング表示の改善
  displayFilteredTodos(allTodos, currentFilter) {
    const todoList = this.elements.todoList;
    todoList.innerHTML = '';

    allTodos.forEach(todo => {
      const todoItem = this.createTodoElement(todo);
      
      // フィルタリングに基づく表示/非表示
      let shouldShow = true;
      switch (currentFilter) {
        case 'active':
          shouldShow = !todo.completed;
          break;
        case 'completed':
          shouldShow = todo.completed;
          break;
        case 'all':
        default:
          shouldShow = true;
          break;
      }
      
      if (!shouldShow) {
        todoItem.style.display = 'none';
      }
      
      todoList.appendChild(todoItem);
    });

    // 表示されているタスクのみで統計更新
    const visibleTodos = allTodos.filter(todo => {
      switch (currentFilter) {
        case 'active': return !todo.completed;
        case 'completed': return todo.completed;
        case 'all':
        default: return true;
      }
    });
    
    this.updateTodoCount(visibleTodos);
  }

  createTodoElement(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.dataset.todoId = todo.id;
    todoItem.dataset.testid = `todo-item-${todo.id}`;

    todoItem.innerHTML = `
      <span class="todo-text" data-testid="todo-text-${todo.id}" ${todo.completed ? 'style="text-decoration: line-through;"' : ''}>${this.escapeHtml(todo.text)}</span>
      <button class="delete-btn" data-testid="delete-button-${todo.id}">削除</button>
    `;

    return todoItem;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  updateTodoCount(todos) {
    if (this.elements.todoCount) {
      const activeCount = todos.filter(todo => !todo.completed).length;
      this.elements.todoCount.textContent = `残り ${activeCount} 件`;
    }
  }

  updateButtonState(isLoading) {
    if (this.elements.addButton) {
      this.elements.addButton.disabled = isLoading;
      this.elements.addButton.textContent = isLoading ? '追加中...' : '追加';
    }
  }

  clearInput() {
    if (this.elements.todoInput) {
      this.elements.todoInput.value = '';
    }
  }

  getInputValue() {
    return this.elements.todoInput ? this.elements.todoInput.value.trim() : '';
  }

  updateFilterButtons(activeFilter) {
    this.elements.filterButtons.forEach(button => {
      button.classList.remove('active');
      if (button.dataset.filter === activeFilter) {
        button.classList.add('active');
      }
    });
  }

  showError(message) {
    alert(message); // 実際のアプリではより適切なエラー表示UIを使用
  }

  showSuccess(message) {
    // 必要に応じて成功メッセージ表示
    console.log('Success:', message);
  }

  // TDD演習：ステータス情報の表示
  updateStatus(statusData) {
    if (this.elements.statusText) {
      if (statusData.status === 'ok') {
        this.elements.statusText.textContent = 'システム正常';
        this.elements.statusLight.className = 'status-light status-ok';
      } else {
        this.elements.statusText.textContent = 'システムエラー';
        this.elements.statusLight.className = 'status-light status-error';
      }
    }

    // 統計情報の更新
    if (statusData.todos) {
      if (this.elements.totalCount) {
        this.elements.totalCount.textContent = statusData.todos.total;
      }
      if (this.elements.completedCount) {
        this.elements.completedCount.textContent = statusData.todos.completed;
      }
      if (this.elements.completionRate) {
        this.elements.completionRate.textContent = `${statusData.todos.completionRate}%`;
      }
    }
  }

  showStatusError(message) {
    if (this.elements.statusText) {
      this.elements.statusText.textContent = 'ステータス取得エラー';
      this.elements.statusLight.className = 'status-light status-error';
    }
    console.error('Status error:', message);
  }
}

window.TodoUI = TodoUI;
