// puxando os elementos canva do css
let canvas = document.querySelector("#game");
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
let fim = false;


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
  if(fim) {
      window.location.reload();
  }
}
// add uma borda, ou seja, a cobra só terá um detrminado espaço de atuação
btnBorder.onclick = function(){    
  if (!fim) {
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
