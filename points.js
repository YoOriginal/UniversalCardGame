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
function calculatePointsAndAddToPlayer(baseSuit, playerToStart) {
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
    let playerToAddPoints = document.getElementsByClassName(playerToStart)[0];
    let pointSpan = playerToAddPoints.getElementsByClassName('pointsValue')[0];
    pointSpan.textContent = Number(pointSpan.textContent) + Number(totalPoints);
}