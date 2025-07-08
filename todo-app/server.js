const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// データをここに直接定義（悪い設計）
let todos = [
  { id: 1, text: 'サンプルタスク1', completed: false },
  { id: 2, text: 'サンプルタスク2', completed: true }
];

// 全てのロジックがここに混在している（悪い設計）

// ToDo一覧取得 - 処理がごちゃごちゃしている
app.get('/api/todos', (req, res) => {
  let result = [];
  for (let i = 0; i < todos.length; i++) {
    let t = todos[i];
    result.push({
      id: t.id,
      text: t.text,
      completed: t.completed
    });
  }
  res.json(result);
});

// ToDo作成 - バリデーションとデータ操作が混在
app.post('/api/todos', (req, res) => {
  let newTodo = req.body;
  
  // バリデーション処理が直接ここに書かれている
  if (!newTodo.text || newTodo.text.trim() === '') {
    return res.status(400).json({ error: 'テキストは必須です' });
  }
  
  if (newTodo.text.length > 100) {
    return res.status(400).json({ error: 'テキストは100文字以内で入力してください' });
  }
  
  // ID生成ロジックが直接ここに
  let maxId = 0;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id > maxId) {
      maxId = todos[i].id;
    }
  }
  
  let t = {
    id: maxId + 1,
    text: newTodo.text.trim(),
    completed: false
  };
  
  todos.push(t);
  res.status(201).json(t);
});

// ToDo更新 - 同様のロジックが重複
app.put('/api/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let updates = req.body;
  
  // 検索処理の重複
  let todoIndex = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todoIndex = i;
      break;
    }
  }
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'ToDoが見つかりません' });
  }
  
  // バリデーション処理の重複
  if (updates.text !== undefined) {
    if (!updates.text || updates.text.trim() === '') {
      return res.status(400).json({ error: 'テキストは必須です' });
    }
    if (updates.text.length > 100) {
      return res.status(400).json({ error: 'テキストは100文字以内で入力してください' });
    }
    todos[todoIndex].text = updates.text.trim();
  }
  
  if (updates.completed !== undefined) {
    todos[todoIndex].completed = updates.completed;
  }
  
  res.json(todos[todoIndex]);
});

// ToDo削除 - また同じような検索処理
app.delete('/api/todos/:id', (req, res) => {
  let id = parseInt(req.params.id);
  
  let todoIndex = -1;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todoIndex = i;
      break;
    }
  }
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'ToDoが見つかりません' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// フィルタリング機能 - 複雑なロジックが直接書かれている
app.get('/api/todos/filter/:status', (req, res) => {
  let status = req.params.status;
  let result = [];
  
  if (status === 'completed') {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed === true) {
        result.push(todos[i]);
      }
    }
  } else if (status === 'active') {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].completed === false) {
        result.push(todos[i]);
      }
    }
  } else if (status === 'all') {
    result = todos;
  } else {
    return res.status(400).json({ error: '無効なステータスです' });
  }
  
  res.json(result);
});

// メインページ配信
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;