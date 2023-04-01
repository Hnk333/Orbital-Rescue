const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spaceship properties
const spaceship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    velocityX: 0,
    velocityY: 0,
};

// Game loop
function gameLoop() {
    updateSpaceship();
    drawSpaceship();
    requestAnimationFrame(gameLoop);
}

// Update spaceship position
function updateSpaceship() {
    spaceship.x += spaceship.velocityX;
    spaceship.y += spaceship.velocityY;
}

// Draw spaceship
function drawSpaceship() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(spaceship.x, spaceship.y, spaceship.size, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

// Start the game loop
gameLoop();
