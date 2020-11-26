 const state ={
   gameOn: false,
   snake: [[1810,1811],1812],
   score: 0,
   direction: 1,
   
 }  

 
create = ()=>{
  let count = 1;
while (count <= 3600) {
  const board = document.getElementsByClassName("board")[0];
  const node = document.createElement("div");

  node.className ="pixle";
   node.id=count;

node.setAttribute("onmouseover", `changeDot('${node.id}')`);
board.append(node);
borderMaker(count)
 count++

}
state.gameOn = true;
makeSnake();
food(randomNumber());
}
const changeDot = (id)=> {console.log(id)}
const makeSnake =()=>{
  if(state.gameOn){
    state.snake[0].forEach((dot)=>{
      document.getElementById(dot).style.background ="black"
    })
    document.getElementById(state.snake[1]).style.background ="red"
  }
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
     for(let i = 1; i<=3600;i++){
       if(i !== head && i !==state.location && !snake.includes(i)) document.getElementById(i).style.background ="lightblue";
     }
}
document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
          if(state.direction !== 60)  state.direction = -60;
    }
    else if (e.keyCode == '40') {
        // down arrow
          if(state.direction !== -60)  state.direction = 60;
    }
    else if (e.keyCode == '37') {
       // left arrow
        if(state.direction !== 1)  state.direction = -1;
    }
    else if (e.keyCode == '39') {
       // right arrow
        if(state.direction !== -1) state.direction = 1;
    }

}

const food =(num)=>{
state.location = num 
document.getElementById(num).style.background = "yellow"
}
const borderMaker = (num) =>{
if(num > 0 && num <=60) document.getElementById(num).style.background = "orange";
if(num > 3540 && num <=3600) document.getElementById(num).style.background = "orange";
if(num % 60 === 0 || (num - 1) % 60 === 0) document.getElementById(num).style.background = "orange";
}

const randomNumber = ()=>{
 let num = Math.floor(Math.random() * 3600);
 if(num > 0 && num <=60) randomNumber();
if(num > 3540 && num <=3600) randomNumber();
if(num % 60 === 0 || (num - 1) % 60 === 0) randomNumber();
return num;
}