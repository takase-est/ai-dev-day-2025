const todoService = require('../services/todoService');
const packageJson = require('../package.json');

class StatusController {
  static getStatus(req, res) {
    try {
      // サーバー起動時刻を記録（実際のアプリではミドルウェアで管理）
      const startTime = process.uptime();
      
      // To-Do統計情報を取得
      const allTodos = todoService.getAllTodos();
      const totalTodos = allTodos.length;
      const completedTodos = allTodos.filter(todo => todo.completed).length;
      const activeTodos = totalTodos - completedTodos;
      const completionRate = totalTodos > 0 
        ? Math.round((completedTodos / totalTodos) * 1000) / 10 
        : 0;

      // ステータス情報を構築
      const statusInfo = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: packageJson.version,
        todos: {
          total: totalTodos,
          completed: completedTodos,
          active: activeTodos,
          completionRate: completionRate
        },
        server: {
          uptime: Math.floor(startTime),
          environment: process.env.NODE_ENV || 'development'
        }
      };

      res.json(statusInfo);
    } catch (error) {
      console.error('Status endpoint error:', error);
      res.status(500).json({
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'サーバーエラーが発生しました'
      });
    }
  }

  // テスト用: 全データクリア
  static clearAllTodos(req, res) {
    try {
      todoService.clearAll();
      res.json({ 
        status: 'ok', 
        message: '全てのToDoが削除されました',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Clear all todos error:', error);
      res.status(500).json({
        status: 'error',
        error: 'データクリアに失敗しました'
      });
    }
  }
}

module.exports = StatusController;
