
// puxando os elementos canva do css
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
 
let box= 32;
let snake = [];

// criando a da cobra
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direction;

// var dos quadradinhos
let square = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

// vars de outras funcinonalidas do jogo
let score = 0;
let level = 1;
let vel = 150;
let border = false;
let end = false;


let btnScore = document.getElementById('points');
let btnReplay = document.getElementById('replay');
let btnLevel = document.getElementById('level');
let btnBorder = document.getElementById('border');

let spanLevel = document.getElementById('spanLevel');
let spanBorder = document.getElementById('spanBorder');
let spanScore = document.getElementById('score');

let gameover = document.getElementById('gameover');

// reinicia o jogo
btnReplay.onclick = function(){
    window.location.reload();
}
// add uma borda, ou seja, a cobra só terá um detrminado espaço de atuação
btnBorder.onclick = function(){    
    if (!end) {
      if (!border) {
          border = true;
          canvas.classList.add('border');
          spanBorder.innerHTML = 'Yes';
      } else {
          border = false;
          canvas.classList.remove('border');
          spanBorder.innerHTML = 'No';
      }
  }
}

// níveis
btnLevel.onclick = function() {    
  if (!end) {
      if (level < 10) {
          level++;
          vel = vel-12;
      } else if (level == 10) {
          level = 1;        
          vel = 150;        
      }
      if (level != 10) {
          spanLevel.innerHTML = level;
      } else {
          spanLevel.innerHTML = level+"!";
      }
      clearInterval(canvas);
      canvas = setInterval(startGame, vel);
  }
}
// criar background color do canvas
function createBG() {
  ctx.fillStyle = '#02201a';
  ctx.fillRect(0, 0, 16 * box, 16 * box);
}

//criar a cobrinha
function createSnake() {
  for(i=0; i < snake.length; i++){
      ctx.fillStyle = 'white';
      ctx.fillRect(snake[i].x, snake[i].y, box, box)        
      ctx.strokeStyle = '#6e7888';
      ctx.strokeRect(snake[i].x, snake[i].y, box, box)
  }
}
function createSquare() {
  ctx.fillStyle = "#6e7888";
  ctx.fillRect(square.x, square.y, box, box);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(square.x, square.y, box, box)
}

document.addEventListener('keydown', update);

// Direções percorridas pela cobra
function update(event){
    if (!end) {
        if(event.keyCode == 37 && direction != "right") direction = "left";
        if(event.keyCode == 38 && direction != "down") direction = "up";
        if(event.keyCode == 39 && direction != "left") direction = "right";
        if(event.keyCode == 40 && direction != "up") direction = "down";
    }
}

function startGame() {  
  if (!border) {
      if(snake[0].x > 15 * box && direction !== "left") snake[0].x = 0;
      if(snake[0].x < 0 && direction != "right") snake[0].x = 15 * box;
      if(snake[0].y > 15 * box && direction != "up") snake[0].y = 0;
      if(snake[0].y < 0 && direction != "down") snake[0].y = 15 * box;
  } else {
      if(snake[0].x > 15 * box) gameOver();
      if(snake[0].x < 0) gameOver();
      if(snake[0].y > 15 * box) gameOver();
      if(snake[0].y < 0) gameOver();
  }
  

  //se a posição 0 da cabeça, irá se chocar com o corpo, para o jogo
  for (i = 1; i < snake.length; i++){
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) gameOver();
  }

  createBG();
  createSnake();
  createSquare();

  // posição cobra 
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // movimentação da cobra
  if(direction == "right") snakeX += box;
  if(direction == "left") snakeX -= box;
  if(direction == "up") snakeY -= box;
  if(direction == "down") snakeY += box;    

  // crescimento da cobra
  if(snakeX != square.x || snakeY != square.y){
      /**
       * se o lugar da cobra for diferente do quadradinhos,
       * ela continua em movimento (removendo um item do array).
       */
      snake.pop();
  } else {
      // se não, não irá remover o item do array e vai para outra posição aleatória      
      square.x = Math.floor(Math.random() * 15 + 1) * box;
      square.y = Math.floor(Math.random() * 15 + 1) * box;

      score++;
      spanScore.innerHTML = score;
  }

  let newHead = {
      x: snakeX,
      y: snakeY
  }

  snake.unshift(newHead);
}

function gameOver() {
    clearInterval(game);        
    end = true;                 
    swal ( "GAME OVER" ,  "clique no botão replay" ,  "error" )
    
}
let game = setInterval(startGame, vel);