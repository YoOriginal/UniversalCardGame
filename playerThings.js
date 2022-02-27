function endTurnBtnToAllPlayers() {
    let playerDivs = document.getElementsByClassName('playerDiv');
    for (playerDiv of playerDivs) {
        appendAsChild(playerDiv, makeEndTurnBtn());
    }
}
function makeEndTurnBtn() {
    let endBtn = document.createElement('button');
    endBtn.className = 'endTurn';
    endBtn.textContent = 'EndTurn'
    return endBtn;
}
function endTurnBtnClick() {
    let endBtns = document.getElementsByClassName('endTurn');
    for (endBtn of endBtns) {
        endBtn.addEventListener('click', endTurnBtnWorking);
    }
}
endTurnBtnToAllPlayers();
endTurnBtnClick();
function endTurnBtnWorking(e) {
    let potCards = potContainer.getElementsByClassName('cardClass');
    if (potCards.length == 0) {
        console.log('Atleast add one card to the pot for computer to play something');
        return;
    }
    let playerDiv = e.target.closest('.playerDiv');
    if (playerDiv.classList.contains('restricted')) {
        console.log('Its not your turn. Please wait while current player plays its turn');
        return;
    }
    let baseSuit = potCards[0].getAttribute('suit');
    // let playerDiv = e.target.closest('.playerDiv');
    let playerCards = playerDiv.getElementsByClassName('cardClass');
    let anybaseSuitCard = false;
    for(let i=0; i<playerCards.length; i++) {
        if (playerCards[i].getAttribute('suit') == baseSuit) {
            anybaseSuitCard = true;
            cardToPot(playerCards[i]);
            applyRestrictedToSelf(playerDiv);
            return;
        }
    }
    if (anybaseSuitCard == false) {
        if (playerCards.length == 0) {
            console.log('There is no card to play');
        } else {
            cardToPot(playerCards[0]);
            applyRestrictedToSelf(playerDiv);
        }
    }
}
