// 様々な機能が無秩序に混在している（悪い設計）

// ID生成機能
function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function getNextId(items) {
  let max = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id > max) {
      max = items[i].id;
    }
  }
  return max + 1;
}

// 日付処理機能（To-Doアプリとは無関係）
function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('ja-JP');
}

function getDaysFromNow(date) {
  const today = new Date();
  const targetDate = new Date(date);
  const diffTime = Math.abs(targetDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// 文字列処理機能
function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncateText(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

// バリデーション機能
function validateTodoText(text) {
  if (!text || text.trim() === '') {
    return { valid: false, error: 'テキストは必須です' };
  }
  if (text.length > 100) {
    return { valid: false, error: 'テキストは100文字以内で入力してください' };
  }
  return { valid: true };
}

function validateEmail(email) {
  // To-Doアプリには不要な機能
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 配列処理機能（一部は不要）
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function shuffleArray(array) {
  // To-Doアプリには不要
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 数学的計算（明らかに不要）
function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

function roundToDecimal(num, decimals) {
  return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

// フィルタリング機能
function filterTodos(todos, status) {
  let result = [];
  
  if (status === 'completed') {
    for (let i = 0; i < todos.length; i++) {
      let t = todos[i];
      if (t.completed === true) {
        result.push(t);
      }
    }
  } else if (status === 'active') {
    for (let i = 0; i < todos.length; i++) {
      let t = todos[i];
      if (t.completed === false) {
        result.push(t);
      }
    }
  } else {
    result = todos;
  }
  
  return result;
}

// エラーハンドリング機能
function createErrorResponse(message, code = 500) {
  return {
    error: message,
    code: code,
    timestamp: new Date().toISOString()
  };
}

// 色関連のユーティリティ（完全に不要）
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

module.exports = {
  generateId,
  getNextId,
  formatDate,
  getDaysFromNow,
  capitalizeFirstLetter,
  truncateText,
  validateTodoText,
  validateEmail,
  removeDuplicates,
  shuffleArray,
  calculatePercentage,
  roundToDecimal,
  filterTodos,
  createErrorResponse,
  hexToRgb
};