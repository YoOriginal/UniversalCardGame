let selectedTrump = '';
function getValueIndex(value) {
    switch(value) {
        case 'A':
            return 0;
        case 'J':
            return 10;
        case 'Q':
            return 11;
        case 'K':
            return 12;
        default:
            return Number(value)-1;
    }
}
function setPointsForCard(card) {
    card.setPoints(cardPoints[card.suit][getValueIndex(card.value)]);  
}
// function setPointForCardDiv(cardDiv) {

// }
for (let i=0; i<myDeck.deck.length; i++) {
    setPointsForCard(myDeck.deck[i]);
}
function showPointsTextForEachPlayer() {
    let playerDivs = document.getElementsByClassName('playerDiv');
    for (playerDiv of playerDivs) {
        let pointsTextSpan = document.createElement('span');
        pointsTextSpan.textContent = 'Points:';
        let pointValueSpan = document.createElement('span');
        pointValueSpan.className = 'pointsValue';
        pointsTextSpan.appendChild(pointValueSpan);
        playerDiv.appendChild(pointsTextSpan);
    }
}
showPointsTextForEachPlayer();
function calculatePointsAndAddToPlayer(playerToStart) {
    let totalPoints = calculatePoints();
    addToPlayer(playerToStart,totalPoints);
}
function calculatePoints() {
    let potCards = potContainer.getElementsByClassName('cardClass');
    let totalPoints = 0;
    for (cardDiv of potCards) {
        let cardPoint = cardDiv.getAttribute('points');
        // let cardSuit = cardDiv.getAttribute('suit');
        // if (cardSuit == baseSuit) {
        //     totalPoints += Number(cardPoint);
        // }
        totalPoints += Number(cardPoint);
    }
    return totalPoints;
}
function addToPlayer(playerToStart,totalPoints) {
    let playerToAddPoints = document.getElementsByClassName(playerToStart)[0];
    let pointSpan = playerToAddPoints.getElementsByClassName('pointsValue')[0];
    pointSpan.textContent = Number(pointSpan.textContent) + Number(totalPoints);
}

function setupTrumpCards(trumpCardsDiv) {
    let jokerCard = new Card('NIL', 'joker', blackJoker[0], 'joker');
    //lets create discardDeck, and pop from that
    let discardDeck = new Deck();
    for (let i=0; i<discardedCards.length; i++) {
        discardDeck.deck.push(discardedCards[i]);
    }
    discardDeck.deck.push(jokerCard);
    let trumpCards = [];
    for (let k=0; k<trumpArr.length; k++) {
        let [cardSuit, cardVal] = makeCardNamesFromTrumpArr(trumpArr[k]);
        let cardIndex = discardDeck.findIndexBy(cardSuit, cardVal);
        let trumpCard = discardDeck.popByIndex(cardIndex);
        trumpCards.push(trumpCard);
    }
    for(let k=0; k<trumpCards.length; k++) {
        let trumpCardDiv = makeCardDiv(trumpCards[k]);
        trumpCardDiv.addEventListener('click', selectTrump);
        appendAsChild(trumpCardsDiv, trumpCardDiv);
    }
}
function makeCardNamesFromTrumpArr(value_suit) {
    if (value_suit == 'Joker') {
        return ['NIL','joker'];
    }
    let cardValue = value_suit[0],
    cardSuit = value_suit[1];
    switch(value_suit[1]) {
        case 'S': cardSuit = 'spades'; break;
        case 'C': cardSuit = 'clubs'; break;
        case 'D': cardSuit = 'diamonds'; break;
        case 'H': cardSuit = 'hearts'; break;
    }
    return [cardSuit,cardValue];
}
function togglePopup() {
    let popupDiv = document.getElementsByClassName('popup')[0];
    // popupDiv.style.display = 'block';
    popupDiv.classList.toggle('show');
}
function setupTrumpPopup() {
    togglePopup();
    //if no cards distributed, this gives error. fix later.
    let trumpCardsDiv = document.getElementsByClassName('trumpCards')[0];
    if (trumpCardsDiv && trumpCardsDiv.childElementCount == 0) {
        setupTrumpCards(trumpCardsDiv);
    }
}
function selectTrump(e) {
    let selectedTrumpCardDiv = e.target;
    selectedTrumpCardDiv.classList.remove('cardClass');
    let trumpCardsDiv = document.getElementsByClassName('trumpCards')[0];
    let remainingCards = trumpCardsDiv.querySelectorAll('.cardClass');
    for (card of remainingCards) {
        card.remove();
    }
    selectedTrumpCardDiv.classList.add('cardClass');
    selectedTrumpCardDiv.removeEventListener('click', selectTrump);
    let selectTrumpText = document.createElement('span');
    selectTrumpText.textContent = '<-- Selected trump suit';
    //setting it in global variable selectedTrump
    selectedTrump = selectedTrumpCardDiv.getAttribute('suit');
    appendAsChild(trumpCardsDiv, selectTrumpText);
}