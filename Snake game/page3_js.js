// accessing the player's details.
var plScore=sessionStorage.getItem("playerScore");
var plHighScore=sessionStorage.getItem("highScore");
var plName=sessionStorage.getItem("playerName");
var plAge=sessionStorage.getItem("playerAge");

// seeting up greetings for player for his performance.
newGreet=document.querySelector("#greetings");
if(newGreet){
    newGreet.innerHTML="Hey " + plName + ", well tried and played at the age of " + plAge + "!!!";
}
else{
    console.log("The element not found!");
}

// displaying the score of the palyer.
newScore=document.querySelector("#plyScore");
if(newScore){
    newScore.innerHTML="Your Score is : " + plScore;
}
else{
    console.log("The element not found!");
}

// code as user takes dicision to re-play or exit the game.
var newRestart=document.querySelector("#restart");
newRestart.addEventListener("click", function(){
   if(plHighScore<=plScore){
    sessionStorage.setItem("highScore", plScore);
   }
    window.location.href="main_game.html";
});

// code when user exits the game, the welcome page is fetched.
var newExit=document.querySelector("#exit");
newExit.addEventListener("click", function(){
    sessionStorage.clear();
    window.location.href="page1.html";
});