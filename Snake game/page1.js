function storeAndRedirect(){
    var cred=document.getElementById("credentials");
    
    
    //  fetching and storing the user credentials to session storage for further usage.

// Player's name.
var pName=document.getElementById("name");
sessionStorage.setItem("playerName", pName.value);

// Player's age.
var pAge=document.getElementById("myAge");
sessionStorage.setItem("playerAge", pAge.value);

//  redirecting to game page.
    window.location.href="main_game.html";
}

// setting initial high score to 0;
sessionStorage.setItem("highScore", 0);






