const express = require('express');
const TodoController = require('../controllers/todoController');
const StatusController = require('../controllers/statusController');

const router = express.Router();

// ステータス関連のルート
router.get('/status', StatusController.getStatus);

// テスト用ルート（プロダクションでは無効化すべき）
router.delete('/test/clear-all', StatusController.clearAllTodos);

// ToDo関連のルート定義
router.get('/todos', TodoController.getAllTodos);
router.post('/todos', TodoController.createTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);
router.get('/todos/filter/:status', TodoController.filterTodos);

module.exports = router;
