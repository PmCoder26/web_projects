// declaring some variables for basic game build.
let direction={x:0, y:0};
const eatSound=new Audio("eatFood.mp3");
const moveSound=new Audio("move.mp3");
const gameOverSound=new Audio("gameover.mp3");
const gameMusic=new Audio("music.mp3");
var speed=0;
var lastPaintTime=0;
let score=0;
let snakeArr=[ {x:5, y:8} ];
let snakeFood={x:14, y:8};
let board=document.getElementById("gameBoard");



// functions of game.


function mainFunction(ctime){
    window.requestAnimationFrame(mainFunction);
    speedSelector();
    if(((ctime-lastPaintTime)/1000)<1/speed){
        return;    
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(sArr){
    var flag=false;
    for(var i=1; i<sArr.length; i++){
        if(sArr[0].x==sArr[i].x && sArr[i].y==sArr[0].y){
            flag=true;
            break;
        }
    }
    if(sArr[0].x<0 || sArr[0].x>18 || sArr[0].y<0 || sArr[0].y>18){
        return true;
    }
        return flag;
}

function gameEngine(){
    // displaying player name.
    plyName.innerHTML= "Player: " + sessionStorage.getItem("playerName");
    // displaying player's high score.
    myHighScore.innerHTML=sessionStorage.getItem("highScore");

    gameMusic.play();
    if(isCollide(snakeArr)){
        sessionStorage.setItem("playerScore", score);
        gameOverSound.play();
        gameMusic.pause();
        direction={x:0, y:0};
        alert("Game over!!!");
        snakeArr=[{x:5, y:8}];
        score=0;
        myScore.innerHTML=score;
        window.location.href="page3.html";
    }
    
    // Now logic if the snake has eaten the food, that is, the position of the food is equal 
    // to that of the head of the snake.
    // The score will be updated and food is randomly localized.
    
    if(snakeArr[0].x==snakeFood.x && snakeArr[0].y==snakeFood.y){
        eatSound.play();
        score+=10;
        myScore.innerHTML=score;
        // unshift inserts new elements at the start of an array, and returns the new length of the array.
        snakeArr.unshift({x:snakeArr[0].x+direction.x, y:snakeArr[0].y+direction.y});
        // updating the loaction of food after snake eats.
        let a=2;
        let b=16;
        snakeFood={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
    }

        // Now, moving the snake.
        for(let idx=snakeArr.length-2; idx>=0; idx--){
            snakeArr[idx+1]={...snakeArr[idx]};   // here '...' is due to avoid the array reference issue.
        }
        snakeArr[0].x+=direction.x;
        snakeArr[0].y+=direction.y;
    


    // display the snake.
    gameBoard.innerHTML="";
    snakeArr.forEach((ele, index)=>{
        snakeEle=document.createElement('div');
        snakeEle.style.gridRowStart=ele.y;
        snakeEle.style.gridColumnStart=ele.x;
        if(index==0){
            snakeEle.classList.add('snakeHead');
        }
        else{
            snakeEle.classList.add('mySnake');
        }
            gameBoard.appendChild(snakeEle);        
    });

    // display the food.
    foodEle=document.createElement('div');
    foodEle.style.gridRowStart=snakeFood.y;
    foodEle.style.gridColumnStart=snakeFood.x;
    foodEle.classList.add('snakeFood');
    gameBoard.appendChild(foodEle);
}
  
    // manipulating the speed of the snake when user configures. 
    function speedSelector(){
        let speedSelect=document.getElementById("currentSpeed");
        switch(speedSelect.value){
            case "Slow":
                speed=8;
                break;
            case "Meduim":
                speed=15;
                break;
            case "Fast":
                speed=25;
                break;
            default:
                break;
        }
    }



// Main logic starts here.
window.requestAnimationFrame(mainFunction);

// Now code for manipulating the direction of the snake after the arrow key is hit by user.
window.addEventListener('keydown', e=>{
    direction={ x:0, y:1};  // also to start the game.
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("The arrow up key is pressed!");
            direction.x=0;
            direction.y=-1;
            break;
        case "ArrowDown":
            console.log("The arrow down key is pressed!");
            direction.x=0;
            direction.y=1;
            break;
        case "ArrowRight":
            console.log("The arrow right key is pressed!");
            direction.x=1;
            direction.y=0;
            break;
        case "ArrowLeft":
            console.log("The arrowDown key is pressed!");
            direction.x=-1;
            direction.y=0;
        default:
            break;
    }
});