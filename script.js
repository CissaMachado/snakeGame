// puxando os elementos do css
let buttonReplay = document.querySelector("#replay");
let score = document.querySelector("#score");
let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

// criando as var da cobra do tabuleiro
let snakeBoard = 64;
let snake = [];
snake[0] = {
  x: 8 * snakeBoard,
  y: 8 * snakeBoard,
};
// var dos quadradinhos
let square = {
  x: Math.floor(Math.random() * 15 + 1) * snakeBoard,
  y: Math.floor(Math.random() * 15 + 1) * snakeBoard,
};

// criando a cobra
function createSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect = (snake[i].x, snake[i].y, box, box);
  }
}
// criando os quadradinhos e *tentando* que eles gerem cores aleatorias*
function createSquare(){

}
