const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = 3000;

// ミドルウェア設定
app.use(express.json());
app.use(express.static('public'));

// APIルートを登録
app.use('/api', todoRoutes);

// メインページ配信
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// テスト実行時はサーバーを起動しない
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;