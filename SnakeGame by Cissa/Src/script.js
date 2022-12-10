// puxando os elementos canva do css
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let box = 32;
let snake = [];

// criando a da cobra
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction;

// let dos quadradinhos
let square = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// let de outras funcinonalidas do jogo
let score = 0;
let level = 1;
let vel = 150;
let border = false;
let end = false;

let btnScore = document.getElementById("points");
let btnReplay = document.getElementById("replay");
let btnLevel = document.getElementById("level");
let btnBorder = document.getElementById("border");

let spanLevel = document.getElementById("spanLevel");
let spanBorder = document.getElementById("spanBorder");
let spanScore = document.getElementById("score");

let gameover = document.getElementById("gameover");

let highscore = localStorage.getItem("highscore")
let highscoreText = document.getElementById('highscore')

// reinicia o jogo
btnReplay.onclick = function () {
 location.reload();
};
// add uma borda, ou seja, a cobra só terá um detrminado espaço de atuação
btnBorder.onclick = function () {
  if (!end) {
    if (!border) {
      border = true;
      canvas.classList.add("border");
      spanBorder.innerHTML = "Yes";
    } else {
      border = false;
      canvas.classList.remove("border");
      spanBorder.innerHTML = "No";
    }
  }
};

// níveis
btnLevel.onclick = function () {
  if (!end) {
    if (level < 10) {
      level++;
      vel = vel - 12;
    } else if (level == 10) {
      level = 1;
      vel = 150;
    }
    if (level != 10) {
      spanLevel.innerHTML = level;
    } else {
      spanLevel.innerHTML = level + "!";
    }
    clearInterval(canvas);
    canvas = setInterval(startGame, vel);
  }
};
// criar background color do canvas
function createBG() {
  ctx.fillStyle = "#02201a";
  ctx.fillRect(0, 0, 16 * box, 16 * box);
}

//criar a cobrinha
function createSnake() {
  for (i = 0; i < snake.length; i++) {
    ctx.fillStyle = "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#6e7888";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
}

function generateColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createSquare() {
  ctx.fillStyle = "#ec008c";
  ctx.fillRect(square.x, square.y, box, box);
  ctx.strokeStyle = '"#ec008c"';
  ctx.strokeRect(square.x, square.y, box, box);
}

document.addEventListener("keydown", update);

// Direções percorridas
function update(event) {
  if (!end) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
  }
}

function startGame() {
  if (!border) {
    if (snake[0].x > 15 * box && direction !== "left") snake[0].x = 0;
    if (snake[0].x < 0 && direction != "right") snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction != "up") snake[0].y = 0;
    if (snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;
  } else {
    if (snake[0].x > 15 * box) gameOver();
    if (snake[0].x < 0) gameOver();
    if (snake[0].y > 15 * box) gameOver();
    if (snake[0].y < 0) gameOver();
  }

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();
  }
  createBG();
  createSnake();
  createSquare();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != square.x || snakeY != square.y) {
    snake.pop();
  } else {
    square.x = Math.floor(Math.random() * 15 + 1) * box;
    square.y = Math.floor(Math.random() * 15 + 1) * box;

    score++;
    spanScore.innerHTML = score;
    
    if(score > highscore){
        highscore = score
      }
      localStorage.setItem("highscore", highscore)
      highscoreText.innerText = highscore
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

function gameOver() {
  clearInterval(game);
  end = true;
  swal("GAME OVER", "clique no botão replay", "error");
}
let game = setInterval(startGame, vel);
