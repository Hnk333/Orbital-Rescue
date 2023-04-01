const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Spaceship properties
const spaceship = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 20,
  velocityX: 0,
  velocityY: 0,
  thrust: 0.03,
};

// Astronaut properties
const astronaut = {
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 10,
};

// Planet properties
const planets = [
  {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 50,
  },
  {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 25,
  },
  {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 30,
  },
];

// Score
let score = 0;

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

// Check if the spaceship has rescued the astronaut
function checkRescue() {
    const dx = astronaut.x - spaceship.x;
    const dy = astronaut.y - spaceship.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < spaceship.size / 2 + astronaut.size / 2) {
      score++;
      astronaut.x = Math.random() * canvas.width;
      astronaut.y = Math.random() * canvas.height;
    }
  }
  
  // Draw scene
  function drawScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw planets
    planets.forEach((planet) => {
      ctx.beginPath();
      ctx.arc(planet.x, planet.y, planet.size, 0, Math.PI * 2);
      ctx.fillStyle = "#B5651D";
      ctx.fill();
      ctx.strokeStyle = "#964B00";
      ctx.stroke();
    });
  
    // Draw astronaut
    ctx.beginPath();
    ctx.arc(astronaut.x, astronaut.y, astronaut.size, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  
    // Draw spaceship
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);
    ctx.rotate(spaceship.angle);
    ctx.beginPath();
    ctx.moveTo(-spaceship.size / 2, spaceship.size / 2);
    ctx.lineTo(spaceship.size / 2, 0);
    ctx.lineTo(-spaceship.size / 2, -spaceship.size / 2);
    ctx.closePath();
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.restore();
  
    // Draw score
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, 10, 20);
  }
  
  // Start the game loop
  gameLoop();
  