//Array of cards               
const myArray = ["diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb",
                 "diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb"];

let previousCard = null;
let matchedCardsNo = 0;
let minutes = 0;
let seconds = 0;
let start = Date.now();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// The function that shuffles the cards and initiates the table
function initiateArray(array){
    shuffle(array);

    array.forEach(function(cardName){
        let newCard = document.createElement("li");
        newCard.className = "card";
        newCard.innerHTML = "<i class=\"fa fa-" + cardName + "\"></i>";
        document.getElementsByClassName("deck")[0].appendChild(newCard);
    });
}

initiateArray(myArray);

// Timer object the includes functions about the time counter
//https://stackoverflow.com/questions/8126466/javascript-reset-setinterval-back-to-0
function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function() {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newT) {
        t = newT;
        return this.stop().start();
    }
}

// Creation of the timer object with the appropriate function 
let timer = new Timer(function() {
    let delta = Date.now() - start;
    seconds = Math.floor(delta / 1000);

    if (seconds === 60){
        minutes++;
        seconds = 0;
        start = Date.now();
    }
    document.getElementById("timer").innerHTML = (minutes < 10 ? "0"+ minutes : minutes) + ":" + (seconds < 10 ? "0"+ seconds : seconds);
}, 100);

// Starting the timer
timer.start();

// Restart button listener
document.getElementsByClassName("restart")[0].addEventListener("click", function() {
    let restart = confirm("Are you sure that you want to start over?");
    if (restart === true){
        restartGame();
    }
});

// Play again button listener
document.getElementById("play-again").addEventListener("click", function(e) {
    document.getElementById("game-div").style.visibility = "visible";
    document.getElementById("result-div").style.display = "none";
    restartGame();
});

// Card listener
document.getElementsByClassName("deck")[0].addEventListener("click", function(e) {
  if (e.target && e.target.matches("li") && e.target.className != "card match" && e.target.className != "card open show") {
    let currentCard = e.target;
    currentCard.classList.remove("buzz"); 

    if (previousCard != null) {
        incrementMoveNo();
        rating(document.getElementsByClassName("moves")[0].innerHTML);
        if (previousCard.innerHTML == currentCard.innerHTML) {
            lockCards(previousCard, currentCard);
            matchedCardsNo += 2;

            if (matchedCardsNo === 16) {
                setTimeout(function() { 
                    let currentSecs = seconds;
                    let currentMins = minutes;
                    timer.stop();

                    document.getElementById("game-div").style.visibility = "hidden";
                    document.getElementById("result-div").style.display = "inline-block";
            
                    document.getElementById("timeCount").innerHTML = (currentMins < 10 ? "0"+ currentMins : currentMins) + ":" + (currentSecs < 10 ? "0"+ currentSecs : currentSecs)
                    document.getElementById("moveCount").innerHTML = document.getElementsByClassName("moves")[0].innerHTML;
                    document.getElementById("starCount").innerHTML = document.getElementsByClassName("fa fa-star").length;   
                }, 1000);
            }
            previousCard = null;
        } else {
            hideCards(previousCard, currentCard);
            previousCard = null;
        }
    } else {
        displayCard(currentCard);
        previousCard = currentCard;
    } 
  }
});

//The function that displays the card
function displayCard(selectedElement){
    selectedElement.className += " open show";
}

// The function that locks the matched cards so that they stay open
function lockCards(matchCard1, matchCard2) {
    matchCard1.className = "card match grow";
    matchCard2.className = "card match grow";
    setTimeout(function(){ matchCard1.classList.remove("grow"); }, 500);
    setTimeout(function(){ matchCard2.classList.remove("grow"); }, 500);
}

// The function that hides the cards if the user picks 2 incorrect
function hideCards(matchCard1, matchCard2) {
    matchCard1.className = "card buzz";
    matchCard2.className = "card buzz"
    setTimeout(function(){ matchCard1.classList.remove("buzz"); }, 1000);
    setTimeout(function(){ matchCard2.classList.remove("buzz"); }, 1000);
}

// The function that increments the move number
function incrementMoveNo() {
    document.getElementsByClassName("moves")[0].innerHTML = parseInt(document.getElementsByClassName("moves")[0].innerHTML) + 1;
}

// The function that handles how many stars should appear depending on the move count
function rating(moveCount) {
    let starList = document.getElementsByClassName("fa fa-star");
    if (moveCount == 13) {
        starList[2].className = "fa fa-star-o";
    } else if (moveCount == 19) {
        starList[1].className = "fa fa-star-o";
    } else if (moveCount == 26) {
        starList[0].className = "fa fa-star-o";
    }
}

// The function that resets the star count
function resetRating() {
    let starList = [...document.getElementsByClassName("fa fa-star-o")];
    starList.forEach((star)=>{
        star.className= "fa fa-star"
        })
}

// The function that restarts the game
function restartGame() {
    let deck = document.getElementsByClassName("deck")[0];
    deck.innerHTML = "";

    document.getElementsByClassName("moves")[0].innerHTML = 0;
    matchedCardsNo = 0;
    start = Date.now();
    minutes = 0;
    timer.reset(100);
    initiateArray(myArray);
    resetRating();
}