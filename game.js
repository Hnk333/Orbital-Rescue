const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spaceship properties
const spaceship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  velocityX: 0,
  velocityY: 0,
  thrust: 0.1,
};

// Astronaut properties
const astronaut = {
  x: 100,
  y: 100,
  size: 10,
};

// Planet properties
const planet = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 50,
  gravity: 1,
};

// Key states
const keys = {
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// Add event listeners for keyboard input
window.addEventListener("keydown", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    event.preventDefault();
    keys[event.key] = false;
  }
});

// Add touch input for mobile devices
canvas.addEventListener("touchstart", (event) => {
  event.preventDefault();
  handleTouchControls(event.touches);
});

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
  handleTouchControls(event.touches);
});

canvas.addEventListener("touchend", (event) => {
  event.preventDefault();
  keys.ArrowUp = keys.ArrowLeft = keys.ArrowRight = false;
});

function handleTouchControls(touches) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  for (let i = 0; i < touches.length; i++) {
    const touchX = touches[i].clientX - canvas.offsetLeft;
    const touchY = touches[i].clientY - canvas.offsetTop;

    if (touchY < centerY) {
      keys.ArrowUp = true;
    } else if (touchX < centerX) {
      keys.ArrowLeft = true;
      keys.ArrowRight = false;
    } else {
      keys.ArrowLeft = false;
      keys.ArrowRight = true;
    }
  }
}

// Game loop
function gameLoop() {
  updateSpaceship();
  applyGravity();
  checkRescue();
  drawScene();
  requestAnimationFrame(gameLoop);
}

// Update spaceship position
function updateSpaceship() {
  if (keys.ArrowUp) {
    spaceship.velocityX += Math.sin(spaceship.angle) * spaceship.thrust;
    spaceship.velocityY -= Math.cos(spaceship.angle) * spaceship.thrust;
  }

  if (keys.ArrowLeft) {
    spaceship.angle -= 0.05;
  }

  if (keys.ArrowRight) {
    spaceship.angle += 0.05;
  }

  spaceship.x += spaceship.velocityX;
  spaceship.y += spaceship.velocityY;
}

// Apply gravity from the planet
function applyGravity() {
  const dx = planet.x - spaceship.x;
  const dy = planet.y - spaceship.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const gravityForce = planet.gravity * spaceship.size / (distance * distance);

  spaceship.velocityX += gravityForce * dx / distance;
  spaceship.velocityY += gravityForce * dy / distance;
}

// Check if the spaceship has rescued
