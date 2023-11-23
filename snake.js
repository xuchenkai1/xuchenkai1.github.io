// 获取画布元素和绘图上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置游戏变量
const cellSize = 10; // 每个格子的大小
let direction = 'right'; // 蛇的初始移动方向
let snake = [{ x: 60, y: 60 }, { x: 40, y: 60 }, { x: 20, y: 60 }]; // 蛇的初始位置
let food = { x: 140, y: 60 }; // 食物的初始位置
let gameOver = false;

// 控制按钮事件监听
document.getElementById('up').addEventListener('click', () => setDirection('up'));
document.getElementById('down').addEventListener('click', () => setDirection('down'));
document.getElementById('left').addEventListener('click', () => setDirection('left'));
document.getElementById('right').addEventListener('click', () => setDirection('right'));
document.getElementById('restartButton').addEventListener('click', restartGame);

// 设置方向函数
function setDirection(newDirection) {
    if ((newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')) {
        direction = newDirection;
    }
}

// 蛇移动函数
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'right': head.x += cellSize; break;
        case 'left': head.x -= cellSize; break;
        case 'up': head.y -= cellSize; break;
        case 'down': head.y += cellSize; break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        createFood();
    } else {
        snake.pop();
    }
}

// 检查游戏结束函数
function checkGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver = true;
        }
    }
    if (snake[0].x < 0 || snake[0].x >= canvas.width ||
        snake[0].y < 0 || snake[0].y >= canvas.height) {
        gameOver = true;
    }
}

// 创建食物函数
function createFood() {
    function randomPosition(min, max) {
        return Math.floor(Math.random() * (max - min) + min) * cellSize;
    }
    food = {
        x: randomPosition(0, canvas.width / cellSize),
        y: randomPosition(0, canvas.height / cellSize)
    };
}

// 绘制函数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, cellSize, cellSize);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);

    if (gameOver) {
        document.getElementById('restartButton').style.display = 'block';
        return;
    }
}

// 游戏主循环
function gameLoop() {
    moveSnake();
    checkGameOver();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 150);
    }
}

// 重新开始游戏函数
function restartGame() {
    snake = [{ x: 60, y: 60 }, { x: 40, y: 60 }, { x: 20, y: 60 }];
    direction = 'right';
    gameOver = false;
    document.getElementById('restartButton').style.display = 'none';
    createFood();
    gameLoop();
}

// 初始化游戏
createFood();
gameLoop();
