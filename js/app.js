/*
 * Array of cards
 */                
const myArray = ["diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb",
                 "diamond", "paper-plane", "anchor", "bolt",
                 "cube", "leaf", "bicycle", "bomb"]

let openCardsArray = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
        var deck = document.getElementsByClassName("deck")[0];
        while (deck.lastChild) {
            deck.removeChild(deck.lastChild);
        }

        initiateArray(myArray);
    }
});

// Card listener
document.getElementsByClassName("deck")[0].addEventListener("click", function(e) {
  if (e.target && e.target.matches("li") && e.target.className == "card") {
    displayCard(e.target);
    if(openCardsArray.indexOf(e.target.childNodes[0]) != -1){
        console.log("match")
    }
    addCard(e.target.childNodes[0]);
    console.log(openCardsArray.indexOf(e.target.childNodes[0]))
    console.log(openCardsArray);
  }
});

function displayCard(selectedElement){
    selectedElement.className += " open show";
}

function addCard(card) {
    openCardsArray.push(card);
}
