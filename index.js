 const state ={
   gameOn: false,
   snake: [[1810,1811],1812],
   score: 0,
   direction: 1,
   location: 0, 
   difficulty : 500,
   highScore: 0
 }  

 
create = ()=>{
  let count = 1;
while (count <= 3600) {
  const board = document.getElementsByClassName("board")[0];
  const node = document.createElement("div");

  node.className ="pixle";
   node.id=count;


board.append(node);
borderMaker(count)
 count++

}

makeSnake();
food(randomNumber());
}

const makeSnake =()=>{

    state.snake[0].forEach((dot)=>{
      document.getElementById(dot).style.background ="black"
    })
    document.getElementById(state.snake[1]).style.background ="red"

}
const moved =()=>{
  if(state.gameOn) move()
  
}
const move=()=>{
  
  let count = state.direction;
  let snake = state.snake[0];
  let head = state.snake[1];
  if(head > 3540) head -= 3540;
   if(head -60 < 1 ) head += 3480;
  snake.forEach((dot)=>{
      document.getElementById(dot).style.background ="lightblue";
    })
    snake.push(head);
    document.getElementById(head).style.background ="lightblue";
    head += count;
    document.getElementById(head).style.background ="red";
    snake.shift();
    snake.forEach((dot)=>{
      document.getElementById(dot).style.background ="black";
    });
    
     state.snake[0] = snake;
     state.snake[1] = head;
     if(head === state.location)  eating()
     endGame(head)
     for(let i = 1; i<=3600;i++){
       if(i !== head && i !==state.location && !snake.includes(i) && borderMaker(i)) document.getElementById(i).style.background ="lightblue";
     }
  
}
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

 if(e.keyCode === 32 ||e.keyCode === 13 )   start();  
    if (e.keyCode === 38) {
        // up arrow
          if(state.direction !== 60)  state.direction = -60;
    }
    else if (e.keyCode ===40) {
        // down arrow
          if(state.direction !== -60)  state.direction = 60;
    }
    else if (e.keyCode === 37) {
       // left arrow
        if(state.direction !== 1)  state.direction = -1;
    }
    else if (e.keyCode ===  39) {
       // right arrow
        if(state.direction !== -1) state.direction = 1;
    }

}

const food =(num)=>{
state.location = num 
document.getElementById(num).style.background = "yellow";

}
const borderMaker = (num) =>{
if(num > 0 && num <=60) document.getElementById(num).style.background = "orange";
if(num > 3540 && num <=3600) document.getElementById(num).style.background = "orange";
if(num % 60 === 0 || (num - 1) % 60 === 0) document.getElementById(num).style.background = "orange";
}

const randomNumber = ()=>{
 let num = Math.floor(Math.random() * 3600);
if(num === state.snake[1] || state.snake[0].includes(num)) return randomNumber();
 if(num > 60 && num < 3541 && num % 60 !== 0 && (num - 1) % 60 !== 0 ) return num;
else return randomNumber()
}

const eating =()=>{

    food(randomNumber());
    state.score++
    document.getElementById("score").innerHTML = state.score;
    state.snake[0].unshift(state.snake[0][0] - state.direction);
if(state.score > state.highScore ){ 
  state.highScore = state.score;
  document.getElementById("highScore").innerHTML = state.highScore;
  }
}
const start =()=>{
state.gameOn = !state.gameOn ;
const button = document.getElementById("button");
button.innerHTML = state.gameOn ? "Pause Game" : "Continue Game"
}

const endGame = (num)=>{
 if(num > 0 && num <=60) gameOver(num);
if(num > 3540 && num <=3600)  gameOver(num);
if(num % 60 === 0 || (num - 1) % 60 === 0)  gameOver(num);
if(state.snake[0].includes(num)) gameOver(num);
}


const gameOver =(id)=>{
  
  for(let i = 1; i<=3600;i++){
    document.getElementById(i).style.background ="lightblue";
     }
  state.gameOn = false;
  state.score = 0;
   document.getElementById("score").innerHTML = state.score;
  state.snake = [[1810,1811],1812];
   food(randomNumber());
   makeSnake();
   borderMaker(id);
   document.getElementById("button").innerHTML ="Start Game"
}
const changeDifficulty=()=>{
  
  setInterval(function(){moved()}, state.difficulty);
}
setInterval(function(){moved()}, 70);
const mobileControls = (id)=>{
 if (id === "up") {
       
          if(state.direction !== 60)  state.direction = -60;
    }
    else if (id === "down") {
       
          if(state.direction !== -60)  state.direction = 60;
    }
    else if (id === "right") {
   
        if(state.direction !== 1)  state.direction = -1;
    }
    else if (id === "left") {
      
        if(state.direction !== -1) state.direction = 1;
    }
}
