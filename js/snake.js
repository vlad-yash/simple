const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

// Size of each cell and field
const box = 20;
const rows = canvas.height / box;
const cols = canvas.width / box;

let snake, direction, food, score, game, gameSpeed = 100;

// Initialize the game
function initGame() {
  snake = [{ x: 5 * box, y: 5 * box }];
  direction = "RIGHT";
  food = spawnFood();
  score = 0;
  drawGame();
  toggleButtons("start");
}

// Generate food
function spawnFood() {
  return {
    x: Math.floor(Math.random() * cols) * box,
    y: Math.floor(Math.random() * rows) * box,
  };
}

// Update the game
function updateGame() {
  const head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Check for collisions
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    clearInterval(game);
    alert(`Game Over! Your score: ${score}`);
    toggleButtons("restart");
    return;
  }

  // Check if food is eaten
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
    score++;
  } else {
    snake.pop();
  }

  snake.unshift(head);
  drawGame();
}

// Draw the game
function drawGame() {
  ctx.fillStyle = "#2d2d2d";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the food
  ctx.fillStyle = "#ff3e6c";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw the snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? "#fff" : "#4caf50";
    ctx.fillRect(segment.x, segment.y, box, box);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(segment.x, segment.y, box, box);
  });

  // Display the score
  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

// Toggle button states
function toggleButtons(state) {
  if (state === "start") {
    startBtn.disabled = true;
    restartBtn.disabled = false;
  } else if (state === "restart") {
    startBtn.disabled = false;
    restartBtn.disabled = false;
  }
}

// Button event listeners
startBtn.addEventListener("click", () => {
  initGame();
  game = setInterval(updateGame, gameSpeed);
});

restartBtn.addEventListener("click", () => {
  clearInterval(game);
  initGame();
  game = setInterval(updateGame, gameSpeed);
});

// Keyboard control
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});
