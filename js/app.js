//Array of cards               
const myArray = ["diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb",
                 "diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb"];

let openCardsArray = [];
let previousCard = null;
let matchedCardsNo = 0;

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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// Restart button listener
document.getElementsByClassName("restart")[0].addEventListener("click", function() {
    let restart = confirm("Are you sure that you want to start over?");
    if(restart == true){
        restart();
    }
});

// Play again button listener
document.getElementById("play-again").addEventListener("click", function(e) {
    document.getElementById("game-div").style.visibility = "visible";
    document.getElementById("result-div").style.display = "none";
    restart();
});

// Card listener
document.getElementsByClassName("deck")[0].addEventListener("click", function(e) {
  if(e.target && e.target.matches("li") && e.target.className != "card match") {
    let currentCard = e.target;
    displayCard(currentCard);

    if(previousCard != null) {
        incrementMoveNo();
        if (previousCard.innerHTML == currentCard.innerHTML) {
            console.log("show");
            lockCards(previousCard, currentCard);
            matchedCardsNo += 2;
            previousCard = null;
        } else {
            console.log("hide");
            hideCards(previousCard, currentCard);
            previousCard = null;
        }
    } else {
        previousCard = currentCard;
    }
    
    if(matchedCardsNo === 4) {
        document.getElementById("game-div").style.visibility = "hidden";
        document.getElementById("result-div").style.display = "inline-block";

        document.getElementById("moveCount").innerHTML = document.getElementsByClassName("moves")[0].innerHTML;
        document.getElementById("starCount").innerHTML = document.getElementsByClassName("fa fa-star").length;

    }
    /*addCard(e.target.innerHTML);

    if(openCardsArray.length > 1){
        let matchCard1 = document.getElementsByClassName(e.target.childNodes[0].className)[0];
        let matchCard2 = document.getElementsByClassName(e.target.childNodes[0].className)[1];
        if(openCardsArray.lastIndexOf(e.target.innerHTML, openCardsArray.lastIndexOf(e.target.innerHTML) - 1) != -1) {
            lockCards(matchCard1, matchCard2);
        } else {
            hideCards(matchCard1, matchCard2);

        }
    }*/
  }
});

function displayCard(selectedElement){
    console.log("card-display");
    selectedElement.classList.add("open");
    selectedElement.classList.add("show");
}

/*function addCard(card) {
    openCardsArray.push(card);
}*/

function lockCards(matchCard1, matchCard2) {
    matchCard1.classList.remove("open");
    matchCard1.classList.remove("show");
    matchCard1.classList.add("match");

    matchCard2.classList.remove("open");
    matchCard2.classList.remove("show");
    matchCard2.classList.add("match");
}

function hideCards(matchCard1, matchCard2) {
    matchCard1.classList.remove("open");
    matchCard1.classList.remove("show");
    matchCard2.classList.remove("open");
    matchCard2.classList.remove("show");

    matchCard1.classList.add("buzz");
    matchCard2.classList.add("buzz");
}

function incrementMoveNo () {
    document.getElementsByClassName("moves")[0].innerHTML = parseInt(document.getElementsByClassName("moves")[0].innerHTML) + 1;
}

function restart() {
    let deck = document.getElementsByClassName("deck")[0];
    while (deck.lastChild) {
        deck.removeChild(deck.lastChild);
    }

    document.getElementsByClassName("moves")[0].innerHTML = 0;
    matchedCardsNo = 0;
    initiateArray(myArray);
}