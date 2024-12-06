// Select the game board
const gameBoard = document.getElementById('game-board');

// Game variables
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = { x: 0, y: 0 };
let newSegments = 0;

// Main game loop
function main() {
    setTimeout(() => {
        update();
        draw();
        main();
    }, 150);
}

// Update the game state
function update() {
    addSegments();
    const inputDirection = getInputDirection();
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += inputDirection.x;
    snake[0].y += inputDirection.y;

    // Check for collisions
    if (checkCollision()) {
        gameOver();
    }

    // Check if snake eats food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        growSnake();
        placeFood();
    }
}

// Draw the game state
function draw() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// Get input direction
function getInputDirection() {
    return direction;
}

// Change direction based on keypress
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
});

// Check collisions
function checkCollision() {
    return (
        snake[0].x < 1 ||
        snake[0].x > boardSize ||
        snake[0].y < 1 ||
        snake[0].y > boardSize ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    );
}

// Grow the snake
function growSnake() {
    newSegments += 1;
}

// Add segments to the snake
function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snake.push({ ...snake[snake.length - 1] });
    }
    newSegments = 0;
}

// Place food in a random position
function placeFood() {
    food = {
        x: Math.floor(Math.random() * boardSize) + 1,
        y: Math.floor(Math.random() * boardSize) + 1
    };
}

// Redirect to another page on game over
function gameOver() {
    alert('Game Over! You will be redirected.');
    window.location.href = 'https://hentaila.tv/'; // Redirects to the "gameover.html" page
}

// Start the game
placeFood();
main();


