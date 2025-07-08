// すべてのロジックがグローバルスコープに混在している（悪い設計）

// グローバル変数の乱用
let todos = [];
let currentFilter = 'all';
let isLoading = false;
let todoInput;
let addButton;
let todoList;
let filterButtons;
let todoCount;
let markAllButton;
let clearCompletedButton;

// 初期化処理 - DOMの準備とイベント設定が混在
document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    todoInput = document.getElementById('todoInput');
    addButton = document.getElementById('addButton');
    todoList = document.getElementById('todoList');
    filterButtons = document.querySelectorAll('.filter-button');
    todoCount = document.getElementById('todoCount');
    markAllButton = document.getElementById('markAllCompleted');
    clearCompletedButton = document.getElementById('clearCompleted');
    
    // イベントリスナーの設定 - 長いコールバック関数が直接書かれている
    addButton.addEventListener('click', function() {
        let text = todoInput.value.trim();
        if (text === '') {
            alert('タスクを入力してください');
            return;
        }
        if (text.length > 100) {
            alert('タスクは100文字以内で入力してください');
            return;
        }
        
        // API呼び出しが直接ここに
        isLoading = true;
        updateButtonState();
        
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || 'エラーが発生しました');
                });
            }
            return response.json();
        })
        .then(todo => {
            todos.push(todo);
            todoInput.value = '';
            renderTodos();
            updateStats();
            updateActionButtons();
        })
        .catch(error => {
            alert('エラー: ' + error.message);
        })
        .finally(() => {
            isLoading = false;
            updateButtonState();
        });
    });
    
    // Enter キー処理
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
    
    // フィルターボタンのイベント処理 - forEach内で直接API呼び出し
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            let filter = this.getAttribute('data-filter');
            currentFilter = filter;
            
            // ボタンの状態更新
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // API呼び出しが混在
            if (filter === 'all') {
                fetch('/api/todos')
                .then(response => response.json())
                .then(data => {
                    todos = data;
                    renderTodos();
                });
            } else {
                fetch(`/api/todos/filter/${filter}`)
                .then(response => response.json())
                .then(data => {
                    todos = data;
                    renderTodos();
                });
            }
        });
    });
    
    // 一括完了ボタン
    markAllButton.addEventListener('click', function() {
        // 複雑な処理が直接書かれている
        let incompleteTodos = todos.filter(t => !t.completed);
        let promises = [];
        
        incompleteTodos.forEach(todo => {
            promises.push(
                fetch(`/api/todos/${todo.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: true })
                })
            );
        });
        
        Promise.all(promises)
        .then(() => {
            loadTodos();
        })
        .catch(error => {
            alert('エラーが発生しました');
        });
    });
    
    // 完了済み削除ボタン
    clearCompletedButton.addEventListener('click', function() {
        let completedTodos = todos.filter(t => t.completed);
        let promises = [];
        
        completedTodos.forEach(todo => {
            promises.push(
                fetch(`/api/todos/${todo.id}`, {
                    method: 'DELETE'
                })
            );
        });
        
        Promise.all(promises)
        .then(() => {
            loadTodos();
        })
        .catch(error => {
            alert('エラーが発生しました');
        });
    });
    
    // 初期データの読み込み
    loadTodos();
});

// ToDoの読み込み - エラーハンドリングが適当
function loadTodos() {
    fetch('/api/todos')
    .then(response => response.json())
    .then(data => {
        todos = data;
        renderTodos();
        updateStats();
        updateActionButtons();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('データの読み込みに失敗しました');
    });
}

// レンダリング処理 - DOM操作とデータ処理が混在
function renderTodos() {
    // リストをクリア
    todoList.innerHTML = '';
    
    // フィルタリング処理がここに直接書かれている
    let filteredTodos = [];
    if (currentFilter === 'all') {
        filteredTodos = todos;
    } else if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    // 空の状態の処理
    if (filteredTodos.length === 0) {
        let emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.innerHTML = '<h3>タスクがありません</h3><p>新しいタスクを追加してください</p>';
        todoList.appendChild(emptyDiv);
        return;
    }
    
    // 各ToDoアイテムの生成 - 長いDOM操作が続く
    filteredTodos.forEach(todo => {
        let li = document.createElement('li');
        li.className = 'todo-item';
        li.setAttribute('data-testid', `todo-item-${todo.id}`);
        
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        // チェックボックス
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.setAttribute('data-testid', `todo-checkbox-${todo.id}`);
        
        // チェックボックスのイベント処理も直接ここに
        checkbox.addEventListener('change', function() {
            // API呼び出しが混在
            fetch(`/api/todos/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: this.checked })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('更新に失敗しました');
                }
                return response.json();
            })
            .then(updatedTodo => {
                // データ更新処理
                let index = todos.findIndex(t => t.id === todo.id);
                if (index !== -1) {
                    todos[index] = updatedTodo;
                }
                renderTodos();
                updateStats();
                updateActionButtons();
            })
            .catch(error => {
                alert('エラー: ' + error.message);
                this.checked = !this.checked; // 元に戻す
            });
        });
        
        // テキスト表示
        let textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todo.text;
        textSpan.setAttribute('data-testid', `todo-text-${todo.id}`);
        
        // テキストクリックでも完了切り替え
        textSpan.addEventListener('click', function() {
            checkbox.click();
        });
        
        // 削除ボタン
        let deleteButton = document.createElement('button');
        deleteButton.className = 'todo-delete';
        deleteButton.textContent = '削除';
        deleteButton.setAttribute('data-testid', `todo-delete-${todo.id}`);
        
        // 削除ボタンのイベント処理も直接ここに
        deleteButton.addEventListener('click', function() {
            if (confirm('このタスクを削除しますか？')) {
                fetch(`/api/todos/${todo.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('削除に失敗しました');
                    }
                    // データから削除
                    todos = todos.filter(t => t.id !== todo.id);
                    renderTodos();
                    updateStats();
                    updateActionButtons();
                })
                .catch(error => {
                    alert('エラー: ' + error.message);
                });
            }
        });
        
        // 要素を組み立て
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// 統計更新 - 計算ロジックとDOM操作が混在
function updateStats() {
    let total = todos.length;
    let completed = todos.filter(t => t.completed).length;
    let active = total - completed;
    
    let text = '';
    if (currentFilter === 'all') {
        text = `${total}個のタスク`;
    } else if (currentFilter === 'active') {
        text = `${active}個の未完了タスク`;
    } else if (currentFilter === 'completed') {
        text = `${completed}個の完了タスク`;
    }
    
    todoCount.textContent = text;
}

// ボタン状態の更新 - 表示ロジックが分散
function updateButtonState() {
    addButton.disabled = isLoading;
    todoInput.disabled = isLoading;
}

// アクションボタンの表示制御 - 複雑な条件分岐
function updateActionButtons() {
    let hasActiveTodos = todos.some(t => !t.completed);
    let hasCompletedTodos = todos.some(t => t.completed);
    
    if (hasActiveTodos) {
        markAllButton.style.display = 'inline-block';
    } else {
        markAllButton.style.display = 'none';
    }
    
    if (hasCompletedTodos) {
        clearCompletedButton.style.display = 'inline-block';
    } else {
        clearCompletedButton.style.display = 'none';
    }
}