// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define snake properties
let snake = [{ x: 10, y: 10 }];
let dx = 10;
let dy = 0;
let food = { x: 0, y: 0 };
let score = 0;

// Generate random food location
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
  food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
}

// Draw snake and food
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, 10, 10);

  // Draw score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 25);
}

// Move snake
function move() {
  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  
  // Wrap snake around canvas edges
  if (head.x < 0) {
    head.x = canvas.width - 10;
  } else if (head.x >= canvas.width) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = canvas.height - 10;
  } else if (head.y >= canvas.height) {
    head.y = 0;
  }


  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }

  // Check if snake hit wall or itself
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(gameInterval);
    alert(`Game over! Final score: ${score}`);
  }
}

// Handle key presses
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      if (dx !== 10) {
        dx = -10;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx !== -10) {
        dx = 10;
        dy = 0;
      }
      break;
    case "ArrowUp":
      if (dy !== 10) {
        dx = 0;
        dy = -10;
      }
      break;
    case "ArrowDown":
      if (dy !== -10) {
        dx = 0;
        dy = 10;
      }
      break;
  }
});

// Start game loop
generateFood();
const gameInterval = setInterval(() => {
  move();
  draw();
}, 100);