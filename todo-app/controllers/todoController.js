const todoService = require('../services/todoService');

class TodoController {
  // ToDo一覧取得
  static getAllTodos(req, res) {
    try {
      const todos = todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
  }

  // ToDo作成
  static createTodo(req, res) {
    try {
      const newTodo = todoService.createTodo(req.body);
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // ToDo更新
  static updateTodo(req, res) {
    try {
      const todoId = parseInt(req.params.id);
      const updatedTodo = todoService.updateTodo(todoId, req.body);
      res.json(updatedTodo);
    } catch (error) {
      if (error.message === 'ToDoが見つかりません') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }

  // ToDo削除
  static deleteTodo(req, res) {
    try {
      const todoId = parseInt(req.params.id);
      todoService.deleteTodo(todoId);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'ToDoが見つかりません') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'サーバーエラーが発生しました' });
      }
    }
  }

  // フィルタリング
  static filterTodos(req, res) {
    try {
      const status = req.params.status;
      const filteredTodos = todoService.filterTodos(status);
      res.json(filteredTodos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = TodoController;
