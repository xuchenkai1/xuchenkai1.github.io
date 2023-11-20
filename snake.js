const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20; // 将画布划分为20x20的网格
let speed = 7; // 初始速度

let snake = [{ x: grid * 5, y: grid * 5 }]; // 蛇的初始位置
let dx = grid; // 水平移动速度
let dy = 0; // 垂直移动速度
let food = { x: grid * 10, y: grid * 10 }; // 食物的初始位置
let score = 0; // 分数

// 监听按键事件
document.getElementById('up').addEventListener('click', () => {
    if (dy === 0) {
      dx = 0;
      dy = -grid;
    }
  });
  
  document.getElementById('down').addEventListener('click', () => {
    if (dy === 0) {
      dx = 0;
      dy = grid;
    }
  });
  
  document.getElementById('left').addEventListener('click', () => {
    if (dx === 0) {
      dx = -grid;
      dy = 0;
    }
  });
  
  document.getElementById('right').addEventListener('click', () => {
    if (dx === 0) {
      dx = grid;
      dy = 0;
    }
  });
  

// 游戏主循环
function gameLoop() {
  setTimeout(() => {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkGameOver();
    requestAnimationFrame(gameLoop);
  }, 1000 / speed);
}

// 清除画布
function clearCanvas() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// 绘制蛇
function drawSnake() {
  ctx.fillStyle = 'green';
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid - 1, grid - 1));
}

// 移动蛇
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    createFood();
    speed += 0.5; // 增加速度
  } else {
    snake.pop();
  }
}

// 绘制食物
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);
}

// 生成食物
function createFood() {
  food = {
    x: getRandomInt(0, canvas.width / grid) * grid,
    y: getRandomInt(0, canvas.height / grid) * grid
  };
}

// 获取随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 检查游戏是否结束
function checkGameOver() {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      alert('游戏结束！你的得分是：' + score);
      document.location.reload();
    }
  }

  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    alert('游戏结束！你的得分是：' + score);
    document.location.reload();
  }
}

// 开始游戏
gameLoop();
